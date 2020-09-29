$(document).ready(function () {
  /**
   * Header dropmenu selection
   */
  $(".dropdown-menu li").on("click", function () {
    var getValue = $(this).text();
    $(".dropdown-select").text(getValue);
  });
  // var inputIncreament = $('increamenter');
  $(".lnk-hours-list").click(function (e) {
    e.preventDefault();
    $(this).closest(".row").toggleClass("open");
  });
  $("input[type='number']").inputSpinner({
    buttonsClass: "",
  });

  /**
   * Custom datepicker
   */
  var startDate;
  var endDate;

  var selectCurrentWeek = function () {
    window.setTimeout(function () {
      $(".week-picker")
        .find(".ui-datepicker-current-day a")
        .addClass("ui-state-active");
    }, 1);
  };

  $(".week-picker").datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: "d M yy",
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    onSelect: function (dateText, inst) {
      var date = $(this).datepicker("getDate");
      startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay() + 1
      );
      endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay() + 5
      );
      var dateFormat =
        inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
      $("#startDate").val(
        $.datepicker.formatDate(dateFormat, startDate, inst.settings)
      );
      $("#endDate").val(
        $.datepicker.formatDate(dateFormat, endDate, inst.settings)
      );

      selectCurrentWeek();
      $("#weekDate").submit();
    },
    beforeShowDay: function (date) {
      var cssClass = "";
      if (date >= startDate && date <= endDate)
        cssClass = "ui-datepicker-current-day";
      return [true, cssClass];
    },
    onChangeMonthYear: function (year, month, inst) {
      selectCurrentWeek();
    },
    beforeShow: function (textbox, instance) {
      $(this).parent().append($("#ui-datepicker-div"));
      $(this).parent().addClass("open");
    },
    onClose: function (event) {
      $(this).parent().removeClass("open");
    },
    defaultDate: +0,
  });

  $("#datepicker-contract").datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: "d M yy",
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    onSelect: function (dateText) {
      $(".week-picker-contactor .week-picker-contract").datepicker(
        "setDate",
        $(this).datepicker("getDate")
      );
      $(".week-picker-contactor .week-picker-contract").html(dateText);
      $(".week-picker-contactor #contractor-calender").val(dateText);
    },
  });

  $(".week-picker-contract").click(function () {
    $(".calender-popup").addClass("active");
  });


  $(document).click(function (event) {
    if (
      !$(event.target).closest(".calender-popup,.week-picker-contract").length
    ) {
      $("body").find(".calender-popup").removeClass("active");
    }
  });

  $(".calender-popup #show-all").click(function () {
    if ($(this).is(":checked")) {
      $(".calender-popup").addClass("chk-box-all"); // checked
      $(".week-picker-contactor .week-picker-contract").text('All Unreviewed');
    } else {
      $(".calender-popup").removeClass("chk-box-all"); // unchecked
    }
  });

  $(
    ".week-picker-activities .week-picker, .week-picker-employee  .week-picker,.modal .week-picker"
  ).datepicker("setDate", new Date());
  // $('.week-picker-contactor input:not(.week-picker)').datepicker('setDate', null);

  $(".week-picker .ui-datepicker-calendar tr").click("mousemove", function () {
    $(this).find("td a").addClass("ui-state-hover");
  });
  $(".week-picker .ui-datepicker-calendar tr").click("mouseleave", function () {
    $(this).find("td a").removeClass("ui-state-hover");
  });

  $(".week-picker-employee #previous-day,.week-picker-activities #previous-day").click(function () {
      console.log("her")
    var currDate = new Date($(".week-picker").datepicker("getDate"));
    currDate.setDate(currDate.getDate() - 1);
    $(".week-picker").datepicker("setDate", currDate);
  });

  $(".week-picker-employee #next-day,.week-picker-activities #next-day").click(function () {
    var currDate = new Date($(".week-picker").datepicker("getDate"));
    currDate.setDate(currDate.getDate() + 1);
    $(".week-picker").datepicker("setDate", currDate);
  });

  // Day Nght toggle switch
  $(".day-night-chk").on("change", 'input[type="radio"].toggle', function () {
    if (this.checked) {
      $('input[name="' + this.name + '"].checked').removeClass("checked");
      $(this).addClass("checked");
      $(".toggle-container")
        .addClass("force-update")
        .removeClass("force-update");
    }
  });
  $('.day-night-chk input[type="radio"].toggle:checked').addClass("checked");
});

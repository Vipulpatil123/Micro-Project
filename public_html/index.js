//var jpdbBaseURL = "http://api.login2explore.com:5577";
//var jpdbIML = "/api/iml";
//var jpdbIRL = "/api/irl";
//
//var dbName = "Student";
//var relName = "Student-Rel";
//var connToken = "90934830|-31949264435275571|90957833";
//
//var currentRecNo = 0;
//
//$(document).ready(function () {
//    resetForm();
//});
//
///* ---------- RESET ---------- */
//function resetForm() {
//    $("#empForm")[0].reset();
//    $("#empid").prop("disabled", false).focus();
//
//    $("#save").prop("disabled", true);
//    $("#change").prop("disabled", true);
//
//    currentRecNo = 0;
//    localStorage.removeItem("recno");
//}
//
///* ---------- NEW ---------- */
//function newData() {
//    $("#empForm")[0].reset();
//    $("#empid").prop("disabled", false).focus();
//
//    $("#save").prop("disabled", false);
//    $("#change").prop("disabled", true);
//
//    currentRecNo = 0;
//    localStorage.removeItem("recno");
//}
//
///* ---------- VALIDATION ---------- */
//function validateData() {
//    if ($("#empid").val() === "" || $("#empname").val() === "") {
//        alert("Employee ID & Name required");
//        return "";
//    }
//
//    return JSON.stringify({
//        empid: $("#empid").val(),
//        name: $("#empname").val(),
//        salary: $("#salary").val(),
//        hra: $("#hra").val(),
//        da: $("#da").val(),
//        deduction: $("#deduct").val()
//    });
//}
//
///* ---------- SAVE ---------- */
//function saveData() {
//    var jsonStr = validateData();
//    if (jsonStr === "") return;
//
//    var putReq = createPUTRequest(connToken, jsonStr, dbName, relName);
//
//    $.ajaxSetup({ async: false });
//    executeCommandAtGivenBaseUrl(putReq, jpdbBaseURL, jpdbIML);
//    $.ajaxSetup({ async: true });
//
//    alert("Record Saved");
//    resetForm();
//}
//
///* ---------- GET BY EMP ID ---------- */
//function getEmp() {
//    var empid = $("#empid").val();
//    if (empid === "") return;
//
//    var getReq = createGETRequest(
//        connToken,
//        dbName,
//        relName,
//        JSON.stringify({ empid: empid })
//    );
//
//    $.ajaxSetup({ async: false });
//    var res = executeCommandAtGivenBaseUrl(getReq, jpdbBaseURL, jpdbIRL);
//    $.ajaxSetup({ async: true });
//
//    if (res.status === 200) {
//        var parsed = JSON.parse(res.data);
//
//        currentRecNo = parsed.rec_no;
//        localStorage.setItem("recno", currentRecNo);
//
//        $("#empname").val(parsed.record.name);
//        $("#salary").val(parsed.record.salary);
//        $("#hra").val(parsed.record.hra);
//        $("#da").val(parsed.record.da);
//        $("#deduct").val(parsed.record.deduction);
//
//        $("#empid").prop("disabled", true);
//        $("#save").prop("disabled", true);
//        $("#change").prop("disabled", false);
//    } else {
//        $("#save").prop("disabled", false);
//    }
//}
//
///* ---------- UPDATE ---------- */
//function changeData() {
//    var jsonStr = validateData();
//    if (jsonStr === "") return;
//
//    var recno = localStorage.getItem("recno");
//    if (!recno) {
//        alert("No record selected");
//        return;
//    }
//
//    var updateReq = createUPDATERecordRequest(
//        connToken,
//        jsonStr,
//        dbName,
//        relName,
//        recno
//    );
//
//    $.ajaxSetup({ async: false });
//    executeCommandAtGivenBaseUrl(updateReq, jpdbBaseURL, jpdbIML);
//    $.ajaxSetup({ async: true });
//
//    alert("Record Updated");
//    resetForm();
//}
//
///* ---------- PREVIOUS ---------- */
//function getPrevious() {
//    if (currentRecNo <= 1) {
//        alert("No previous record");
//        return;
//    }
//
//    var prevRecNo = currentRecNo - 1;
//
//    var getReq = createGET_BY_RECORDRequest(
//        connToken,
//        dbName,
//        relName,
//        prevRecNo
//    );
//
//    $.ajaxSetup({ async: false });
//    var res = executeCommandAtGivenBaseUrl(getReq, jpdbBaseURL, jpdbIRL);
//    $.ajaxSetup({ async: true });
//
//    if (res.status === 200) {
//        var parsed = JSON.parse(res.data);
//
//        currentRecNo = parsed.rec_no;
//        localStorage.setItem("recno", currentRecNo);
//
//        $("#empid").val(parsed.record.empid).prop("disabled", true);
//        $("#empname").val(parsed.record.name);
//        $("#salary").val(parsed.record.salary);
//        $("#hra").val(parsed.record.hra);
//        $("#da").val(parsed.record.da);
//        $("#deduct").val(parsed.record.deduction);
//
//        $("#change").prop("disabled", false);
//        $("#save").prop("disabled", true);
//    }
//}




var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";

var dbName = "Student";
var relName = "Student-Rel";
var connToken = "90934830|-31949264435275571|90957833";

var currentRecNo = 0;

$(document).ready(function () {
    resetForm();
});

/* ---------- RESET (STEP-2 INITIAL STATE) ---------- */
function resetForm() {

    // Clear values manually (IMPORTANT)
    $("#rollno").val("");
    $("#fullname").val("");
    $("#class").val("");
    $("#dob").val("");
    $("#address").val("");
    $("#enrolldate").val("");

    // Enable only primary key
    $("#rollno").prop("disabled", false).focus();

    // Disable other fields
    $("#fullname").prop("disabled", true);
    $("#class").prop("disabled", true);
    $("#dob").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrolldate").prop("disabled", true);

    // Disable buttons
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);

    currentRecNo = 0;
}

/* ---------- ENABLE NON-PK FIELDS ---------- */
function enableFields() {
    $("#fullname").prop("disabled", false);
    $("#class").prop("disabled", false);
    $("#dob").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrolldate").prop("disabled", false);
    $("#fullname").focus();
}

/* ---------- CHECK PRIMARY KEY ---------- */
function getStudent() {
    var roll = $("#rollno").val();
    if (roll === "") return;

    var getReq = createGETRequest(
        connToken,
        dbName,
        relName,
        JSON.stringify({ rollno: roll })
    );

    $.ajaxSetup({ async: false });
    var res = executeCommandAtGivenBaseUrl(getReq, jpdbBaseURL, jpdbIRL);
    $.ajaxSetup({ async: true });

    if (res.status === 200) {
        // EXISTING RECORD
        var parsed = JSON.parse(res.data);
        currentRecNo = parsed.rec_no;

        $("#fullname").val(parsed.record.fullname);
        $("#class").val(parsed.record.class);
        $("#dob").val(parsed.record.dob);
        $("#address").val(parsed.record.address);
        $("#enrolldate").val(parsed.record.enrolldate);

        $("#rollno").prop("disabled", true);
        enableFields();

        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);

    } else {
        // NEW RECORD
        enableFields();
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#update").prop("disabled", true);
    }
}

/* ---------- VALIDATION ---------- */
function validateData() {
    if ($("#rollno").val() === "" ||
        $("#fullname").val() === "" ||
        $("#class").val() === "" ||
        $("#dob").val() === "" ||
        $("#address").val() === "" ||
        $("#enrolldate").val() === "") {
        alert("All fields are required");
        return "";
    }

    return JSON.stringify({
        rollno: $("#rollno").val(),
        fullname: $("#fullname").val(),
        class: $("#class").val(),
        dob: $("#dob").val(),
        address: $("#address").val(),
        enrolldate: $("#enrolldate").val()
    });
}

/* ---------- SAVE ---------- */
function saveData() {
    var jsonStr = validateData();
    if (jsonStr === "") return;

    var putReq = createPUTRequest(
        connToken,
        jsonStr,
        dbName,
        relName
    );

    $.ajaxSetup({ async: false });
    executeCommandAtGivenBaseUrl(putReq, jpdbBaseURL, jpdbIML);
    $.ajaxSetup({ async: true });

    alert("Record Saved Successfully");

    // 🔥 Force initial blank state
    resetForm();
}

/* ---------- UPDATE ---------- */
function updateData() {
    var jsonStr = validateData();
    if (jsonStr === "") return;

    var updateReq = createUPDATERecordRequest(
        connToken,
        jsonStr,
        dbName,
        relName,
        currentRecNo
    );

    $.ajaxSetup({ async: false });
    executeCommandAtGivenBaseUrl(updateReq, jpdbBaseURL, jpdbIML);
    $.ajaxSetup({ async: true });

    alert("Record Updated Successfully");

    // Back to initial state
    resetForm();
}

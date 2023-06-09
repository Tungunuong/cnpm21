function notNull(text, error) {
  var result = document.getElementById(error);
  result.style.display = "block";
  if (text < 0) {
    result.innerHTML = "Không hợp lệ!";
    return false;
  }
  else if (text.trim() == "") {
    result.innerHTML = "Phải được điền vào!";
    return false;
  }
  result.style.display = "none";
  return true;
}

function validateName(name, error) {
  var result = document.getElementById(error);
  result.style.display = "block";
  if (name.trim() == "") {
    result.innerHTML = "Phải được điền vào!";
    return false;
  }
  result.innerHTML = "Chỉ được chứa các chữ cái!";
  for (var i = 0; i < name.length; i++)
    if (!((name[i] >= 'a' && name[i] <= 'z') || (name[i] >= 'A' && name[i] <= 'Z') || name[i] == ' '))
      return false;
  result.style.display = "none";
  return true;
}

function validateContactNumber(contact_number, error) {
  var result = document.getElementById(error);
  result.style.display = "block";
  if (contact_number.length != 10) {
    result.innerHTML = "Phải chứa 10 chữ số!";
    return false;
  }
  else
    result.style.display = "none";
  return true;
}

function validateAddress(address, error) {
  var result = document.getElementById(error);
  result.style.display = "block";
  if (address.trim().length < 10) {
    result.innerHTML = "Vui lòng nhập địa chỉ cụ thể hơn!";
    return false;
  }
  else
    result.style.display = "none";
  return true;
}

function checkExpiry(date, error) {
  var result = document.getElementById(error);
  result.style.display = "block";
  if (date.trim() == "" || date.trim().length != 5 || date[2] != "/")
    result.innerHTML = "Nhập thời Gian kiểu mm/yy !";
  else if (date.slice(0, 2) < 1 || date.slice(0, 2) > 12)
    result.innerHTML = "Tháng Không Hợp Lệ !";
  else if (new Date("20" + date.slice(3, 5), date.slice(0, 2)) < new Date()) {
    result.innerHTML = "Thuốc Hết Hạn";
    return -1;
  }
  else {
    result.style.display = "none";
    return true;
  }
  return false;
}

function checkQuantity(quantity, error) {
  var result = document.getElementById(error);
  result.style.display = "block";
  if (quantity < 0 || !Number.isInteger(parseFloat(quantity)))
    result.innerHTML = "Số Lượng Không Hợp Lệ !";
  else {
    result.style.display = "none";
    return true;
  }
  return false;
}

function checkValue(value, error) {
  var result = document.getElementById(error);
  result.style.display = "block";
  if (value < 0 || value == "")
    result.innerHTML = "Không Hợp Lệ !";
  else {
    result.style.display = "none";
    return true;
  }
  return false;
}

function checkDate(date, error) {
  var result = document.getElementById(error);
  result.style.display = "block";
  if (date == "")
    result.innerHTML = "Không Được Để Trống !";
  else if (new Date(date) > new Date())
    result.innerHTML = "Không được là ngày trong tương lai!";
  else {
    result.style.display = "none";
    return true;
  }
  return false;
}

function addCustomer() {
  document.getElementById("customer_acknowledgement").innerHTML = "";
  var customer_name = document.getElementById("customer_name");
  var contact_number = document.getElementById("customer_contact_number");
  var customer_address = document.getElementById("customer_address");
  var doctor_name = document.getElementById("customer_doctors_name");
  var doctor_address = document.getElementById("customer_doctors_address");
  if (!validateName(customer_name.value, "name_error"))
    customer_name.focus();
  else if (!validateContactNumber(contact_number.value, "contact_number_error"))
    contact_number.focus();
  else if (!validateAddress(customer_address.value, "address_error"))
    customer_address.focus();
  else if (!validateName(doctor_name.value, 'doctor_name_error'))
    doctor_name.focus();
  else if (!validateAddress(doctor_address.value, 'doctor_address_error'))
    doctor_address.focus();
  else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById("customer_acknowledgement").innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/add_new_customer.php?name=" + customer_name.value + "&contact_number=" + contact_number.value + "&address=" + customer_address.value + "&doctor_name=" + doctor_name.value + "&doctor_address=" + doctor_address.value, true);
    xhttp.send();
  }
  return false;
}

function addSupplier() {
  document.getElementById("supplier_acknowledgement").innerHTML = "";
  var supplier_name = document.getElementById("supplier_name");
  var supplier_email = document.getElementById("supplier_email");
  var contact_number = document.getElementById("supplier_contact_number");
  var supplier_address = document.getElementById("supplier_address");
  if (!validateName(supplier_name.value, "name_error"))
    supplier_name.focus();
  else if (!validateContactNumber(contact_number.value, "contact_number_error"))
    contact_number.focus();
  else if (!validateAddress(supplier_address.value, "address_error"))
    supplier_address.focus();
  else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById("supplier_acknowledgement").innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/add_new_supplier.php?name=" + supplier_name.value + "&email=" + supplier_email.value + "&contact_number=" + contact_number.value + "&address=" + supplier_address.value, true);
    xhttp.send();
  }
}

function addMedicine() {
  document.getElementById("medicine_acknowledgement").innerHTML = "";
  var name = document.getElementById("medicine_name");
  var packing = document.getElementById("packing");
  var generic_name = document.getElementById("generic_name");
  var suppliers_name = document.getElementById("suppliers_name");
  if (!notNull(name.value, "medicine_name_error"))
    name.focus();
  else if (!notNull(packing.value, "pack_error"))
    packing.focus();
  else if (!notNull(generic_name.value, "generic_name_error"))
    generic_name.focus();
  else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById("medicine_acknowledgement").innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/add_new_medicine.php?name=" + name.value + "&packing=" + packing.value + "&generic_name=" + generic_name.value + "&suppliers_name=" + suppliers_name.value, true);
    xhttp.send();
  }
}

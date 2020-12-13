var error = document.getElementById("errors")
function validate() {
  document.getElementById("errors").innerHTML = ""
  var result = "";
  result += validateUsername();
  result += validateEmail();
  result += validatePassword();
  if (result == "") return true;
  // alert("Validation Result:\n\n" + result);
  var errors = result.split(".")
  errors.pop();
  errors.forEach((err) => {
    var list = document.createElement("ul");
    var node = document.createElement("li");  
    var text = document.createTextNode(err);
                    
    node.appendChild(text);
    list.appendChild(node);                              
    document.getElementById("errors").appendChild(list)
  })
  return false;
}

function validateUsername() {
  var name = document.getElementsByName("username")[0].value;
  if (name.length < 8)
    return "Username should be at least 8 characters.";
  return "";
}

function validatePassword() {
  var password = valueOf("password");
  var retype = valueOf("rpassword");
  var reg = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/;
  if (!password.match(reg))
    return "Password should be at least 8 characters, Contain one lower case, one Upper case and atleast one numerical.";
  if (password != retype)
    return "Passwords do not match.";
  return "";
}

function validateEmail() {
  var email = valueOf("email");
  var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (!email.match(pattern))
    return "Enter a Valid Email Address.";
  return "";
}

function valueOf(name) {
  return document.getElementsByName(name)[0].value;
}

// window.onload = function () {
//   
// };
console.log("Enter");
var loader = setInterval(() => {
  if (document.readyState !== "complete") return;
  clearInterval(loader);
  document.getElementById("click").click();
  // document.write("Document loaded successful!");
}, 200);

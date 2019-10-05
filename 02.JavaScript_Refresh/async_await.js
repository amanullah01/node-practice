function callAfter2Seconds() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Its call after 2 seconds ");
    }, 2000);
  });
}

var asyncCall = async () => {
  console.log("Calling Async function");
  var result = await callAfter2Seconds();
  console.log(result);
  console.log("The end");
};

asyncCall();

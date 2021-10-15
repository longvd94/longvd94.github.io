const fakeResponse = (data?: any, error?: any, timeout: number = 2000) => new Promise((resolve, reject) => {
    if (error) {
      reject(error);
      return;
    }
  
    setTimeout(() => {
      resolve(data)
    }, timeout);
})

export default fakeResponse;
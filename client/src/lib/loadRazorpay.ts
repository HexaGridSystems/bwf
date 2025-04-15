// Function to load the Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // If Razorpay is already loaded, resolve immediately
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Create script element to load Razorpay
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    // Add script to head
    document.body.appendChild(script);
  });
};
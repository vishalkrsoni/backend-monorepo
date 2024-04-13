interface EmailOptions<T> {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const emailOptions = <T>(
  sender: string,
  receiver: string,
  subject: string,
  content: T
): EmailOptions<T> => {
  return {
    from: sender,
    to: receiver,
    subject: subject,
    html: `
      <html>
        <head>
          <style>
            /* Add CSS styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              font-size: 16px;
              line-height: 1.5;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>You have received a message</h1>
            ${generateContent(content)}
          </div>
        </body>
      </html>
    `,
  };
};

function generateContent<T>(content: T): string {
  if (typeof content === 'string') {
    return `<p><strong>Message:</strong></p>
            <p>${content}</p>`;
  } else {
    let result = '';
    for (const key in content) {
      if (Object.prototype.hasOwnProperty.call(content, key)) {
        result += `<p><strong>${key}:</strong> ${content[key]}</p>`;
      }
    }
    return result;
  }
}

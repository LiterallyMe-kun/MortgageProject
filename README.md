Description:
This project is a mortgage payment calculator, fetching the current nationwide average rate from FRED's (Federal Reserve Bank of St. Louis) API. It also contains a small advice page with some reputable lenders linked below.

Instructions:
When the app completes its API call, simply type in the amount of money you'd like to borrow, your desired loan term, change the interest rate if you so choose, and then hit calculate. The app will then display the amount of money you need to pay back the loan, how much your monthly payment will be, and how much you paid on interest. You can navigate to and from the Advice page without wiping the app's state, so your calculation persists until the next calculation.

API: 
I created a FRED account and requested an API key from this url.(https://fredaccount.stlouisfed.org/apikeys) ChatGPT found in the documentation how one should write the proper JQuery to fetch the latest recorded mortgage rate and helped me properly integrate the JSON via type guards.

Additional Features:
Because I was getting CORS errors when I ran the naked API url, ChatGPT showed me step by step how to create a sort of mask for the API call using Node.js, Netlify's environmental variable settings, and a special handler function which resides in netlify/functions in this repo.
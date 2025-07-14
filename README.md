# MVP for Veritas Insurance Core

Making Stablecoins stable again.

### Things to change (Deadline by 26 July 2025)

General notes

* Everything below must be synced to relevant schema in firebase and ensure values are updated live

Anonymous user

1. Dashboard screen
    * Clicking the pool value should bring users to a more in-depth screen with graphs that shows growing pool value over time
2. Lending/Borrowing screen
    * Should show a singular market dashboard for borrowing (under juicefinance's lending) where all functionality is gatekept under logging in
    * Similar to Aave also

Logged in user

1. Dashboard screen
    * Clicking the pool value should bring users to a more in-depth screen with graphs that shows growing pool value over time
2. Deposit/Lending/Borrowing screen
    1. Users MUST always deposit assets first and will then be asked to exchange it for XSgd (DEPOSIT)
        * **DON'T SHOW MULTI-ASSET DEPOSIT FOR NOW!!! INSTEAD LET USERS JUST DEPOSIT XSGD STRAIGHT!!!** 
        * Allowed assets: BTC, ETH, USDT, USDC
        * Add a next-to-go conversion screen that converts these assets to XsGD 
    2. Users can exchange their XsGD value from their account for a proportional amount of LP tokens, thereby contributing to the XsGD lending pool (LEND)
        * Add a simple backend calculation
        * Add a logically shown screen that explains why they are getting their LP token for that amount
    3. Users can then choose to also exchange their LP token at anytime to retrieve money based on % accruement + principal amount (BORROW)
        * Add notification screen that user will be charged a proportional withdrawal fee
        * Do a backend check with the DB to ensure that they have enough LP tokens to do so 
    4. Users can then also choose to exchange their LP token to borrow more XSGD from us + we specify the interest rate for borrowing (BORROW)
        * Do a backend check for the DB to ensure they have enough LP tokens to do so

### Credentials

#### Veritas Login Test Account (or just make a new account)

* balls@gmail.com
* tweaking

#### Gmail, Firebase, Vercel deployment

* veritasinsurancesg@gmail.com
* veritasinsurancesg2025

#### `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAMAnrRV-zMLbxIJDYZxYRBMrnq8H1VBns
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=veritas-insurance-core.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://veritas-insurance-core-default-rtdb.asia-southeast1.firebasedatabase.app
NEXT_PUBLIC_FIREBASE_PROJECT_ID=veritas-insurance-core
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=veritas-insurance-core.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=252138312766
NEXT_PUBLIC_FIREBASE_APP_ID=1:252138312766:web:c746f527a4dad0d3f7ad6f
```

### Value Proposition

#### Links

* [Updated Canva Pitch Deck](https://www.canva.com/design/DAGsFpctDPc/3xg1_mWRvNI8-xKh4SyyeA/edit?utm_content=DAGsFpctDPc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

#### Explanation

* When users deposit Assets (swapped for XSGD) with us, user will be issued an LP token (represents the percentage ownership of the total pool) if they choose to lend it
* At any time users can do either of the following
    1. Users can exchange their LP token at anytime to retrieve XSGD based on % accruement + principal amount +  **NOTE** there are withdrawal fees involved (cashing out)
    2. Users can exchange their LP token to borrow XSGD from us to use to continue accrueing their % accruement + **NOTE** we earn interest off this borrowing (borrowing)
* LPs are backed by RWAs (Annuity and Endowments)

![](./asset/reference/art.png)

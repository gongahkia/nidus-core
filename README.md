# MVP for Veritas Insurance Core

Making Stablecoins stable again.

### To do (deadline ...)

#### General

* Add an additional card on the existing logged in Accounts page for users to **withdraw** their XsGD, must call and CRUD to the firebase accordingly
* Change any mention of xsgd to the semantically correct "XSGD"
* Add a bottom footer for Veritas similar to this with relevant linked sites

<img width="600" alt="image" src="https://github.com/user-attachments/assets/497dffa1-3464-4693-859b-cc662a878833" />

#### Specific

##### Un-logged in

1. Dashboard screen
    * 
2. Lending/Borrowing screen
    * 
3. Account screen
    *

##### Logged in

1. Dashboard screen
    * 
2. Lending/Borrowing screen
    * 
3. Account screen
    *
   
### Credentials

#### Veritas Login Test Account with values

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

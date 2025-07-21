# MVP for NIDUS Core

### To do (soft deadline 27 jul, hard deadline 31 jul)

#### General

* Once the entire UI is approved, make new project and deploy on vercel under new name, purpose is for URL to be changed

#### Specific

##### Un-logged in

1. Dashboard screen
    * Reference Infrared's https://infrared.finance/portfolio site
    * Include the "Portfolio" card and it calls the firebase DB for the user's account (gray it out with an overlay and redirect to log in)!!!
    * Include the "Vaults" card below (or somewhere else) 
    * Include a blackened-out overlay stating "coming soon" that shows "NIDUS" with a logo, APR, Points and Balance with - for placeholder value for now 
2. Vault screen
    * Rewrite this page 
    * Replace the entire description of "Lending/Borrowing" with "Vault" in navbar and header 
    * Reference these 2 sites, specifically https://app.hyperliquid.xyz/ vault page AND https://infrared.finance/ but they have multiple strategies
    * For us, we just display 1 strategy for now, must display all the fields
    * Clicking through one strategy should bring users to a WITHDRAWAL/DEPOSIT page 
    * Name our strategy XSGD-RWA 
    * Should call the Firebase schema 
2.5 Withdrawal/Deposit page 
     * 1. For this page specifically, reference https://infrared.finance/'s page after clicking through to a given plan
          * Include a similar graph display and everything on that page 
          * Include the details card as well
     * 2. For this page specifically, also add the table displaying all values "Balances - Depositors" below the existing infrared cards that are included, can reference this site https://app.hyperliquid.xyz/vaults/0x07fd993f0fa3a185f7207adccd29f7a87404689d
     * Users should NOT be able to access the withdraw/borrow card when not logged in (gray it out with an overlay and redirect to log in)!!!
     * Name our strategy XSGD-RWA 
    * Should call the Firebase schema 
3. Account screen
    * Redirect immediately to the login page

##### Logged in

1. Dashboard screen
    * Reference Infrared's https://infrared.finance/portfolio site
    * Include the "Portfolio" card and it calls the firebase DB for the user's account
    * Include the "Vaults" card below (or somewhere else) 
    * Include a blackened-out overlay stating "coming soon" that shows "NIDUS" with a logo, APR, Points and Balance with - for placeholder value for now 
2. Vault screen
    * Rewrite this page 
    * Replace the entire description of "Lending/Borrowing" with "Vault" in navbar and header 
    * Reference these 2 sites, specifically https://app.hyperliquid.xyz/ vault page AND https://infrared.finance/ but they have multiple strategies
    * For us, we just display 1 strategy for now, must display all the fields
    * Clicking through one strategy should bring users to a WITHDRAWAL/DEPOSIT page 
    * Name our strategy XSGD-RWA 
    * Should call the Firebase schema 
2.5 Withdrawal/Deposit page 
     * 1. For this page specifically, reference https://infrared.finance/'s page after clicking through to a given plan
          * Include a similar graph display and everything on that page 
          * Include the details card as well
     * 2. For this page specifically, also add the table displaying all values "Balances - Depositors" below the existing infrared cards that are included, can reference this site https://app.hyperliquid.xyz/vaults/0x07fd993f0fa3a185f7207adccd29f7a87404689d
     * Implement the actual Withdrawal/Deposit functionality that writes to the firebase DB 
     * Name our strategy XSGD-RWA 
    * Should call the Firebase schema 
3. Account screen
    * Include the values from the "Portfolio" card 
    * It should call the firebase DB for the user's account
   
## Contributors

<table>
	<tbody>
        <tr>
	    <td align="center">
                <a href="https://github.com/gongahkia">
                    <img src="https://avatars.githubusercontent.com/u/117062305?v=4" width="100;" alt="gongahkia"/>
                    <br/>
                    <sub><b>Gabriel Ong</b></sub>
                    <br/>
                </a>
                <sub><i>Full Stack</i></sub>
            </td>
        </tr>
	<tbody>
</table>

### Credentials

#### Nidus Login Test Account with values

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

### Links

* [Updated Canva Pitch Deck](https://www.canva.com/design/DAGsFpctDPc/3xg1_mWRvNI8-xKh4SyyeA/edit?utm_content=DAGsFpctDPc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

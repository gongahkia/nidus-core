# MVP for NIDUS Core

### To do (deadline ...)

#### General

* Refactor all relevant code files to make vault strategies viewable globally on the
    * Dashboard screen
    * Vaults screen
    * Withdrawal/Deposits screen
        * **Only** depositing and transacting in vaults within the Withdrawal/Deposits page should be gatekept behind login status
* Sync up the withdrawal, deposit and receipt modals so that it can dynamically withdraw and deposit from any of the user's strategies, **currently** just hardcoded to XSGD since that's the MVP requirement
* Debug error modal and notifications for the Withdrawal/Deposits page so users can't withdraw/deposit 0, can't withdraw more than they already have, add a hardcoded deposit limit
* Once the entire UI is approved, make new project and deploy on vercel under new name, purpose is for URL to be changed

* Strategy, Risk, LTV, Penalty, Min Collateral, Borrow Rate  removed from strategy-specific page
* Remove ENTIRE funding table from strategy specific page
* Hide THE positions table from strategy specific page
* Modify it to XSGD and USD and SGD in Accounts page (6% exchange rate for XSGD-RWA) on accounts page 
* Include a list of all user's varied assets that contribute to a single Portfolio asset value on accounts page 
* Make richard's screenshots for 6 months and 1 year to be triggered under Deposit workflow after clicking the Deposit button and before the Transaction receipt on

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

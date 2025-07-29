# MVP for NIDUS Core

### To do (deadline ...)

#### General

* Refactor all relevant code files to make vault strategies viewable globally on the Dahsboard and Vaults page, **only** depositing and transacting in vaults should be gatekept behind login status
* Resolve problems with vercel deployment
* Once the entire UI is approved, make new project and deploy on vercel under new name, purpose is for URL to be changed

#### Specific

##### Un-logged in

1. Dashboard screen
2. Vault screen
2.5 Specific strategy page
3. Points screen
4. Accounts screen

##### Logged in

1. Dashboard screen
2. Vault screen
2.5 Specific strategy page
    * Implement the actual Withdrawal/Deposit functionality that writes to the firebase DB 
3. Points screen
4. Accounts screen
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

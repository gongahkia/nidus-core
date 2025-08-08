# MVP for NIDUS Core

## Access

* [veritas-core.vercel.app](https://veritas-core.vercel.app/)
* [veritas-core.vercel.app/landing](https://veritas-core.vercel.app/landing)

### To do (deadline ...)

* For each Vault-specific plan page, the Strategy: XXX should instead become Tokenised Singapore Insurance Secondary Market Yields
* For each Vault-specific plan page, remove the words "performance snapshot" and move the strategy name above the graph display
* For each Vault-specific plan page, modify the performance snapshot graph so that when hovered over with the mouse it should show APR or TVL instead of value
* For each Vault-specific plan page, modify the performance snapshot X-axis so that Day 1 2 3 becomes exact dates in 3-day intervals
* Modify performance snapshot to include 2 graphs per the below screenshot for APR and TVL, modify the firebase schema accordingly
* Each graph should have a dropdown list of variable timeframes (last week, last month, last 3 months, last 6 months, last year)
* For each Vault-specific plan page, comment out the "Trade History" table for now so its just showing a single table 

<img width="937" height="400" alt="image" src="https://github.com/user-attachments/assets/302b40ec-f60d-4ec6-bd93-6574b03553fa" />

* Account page settings, remove the Auto-Compound Rewards and remove currency conversion
* Account page settings, make the assets card properly stylised like the portfolio card currently instead of just raw text
* Help and support page, remove "Getting started with lending and borrowing" and "Understanding NFT insurance assets"
* Firebase schema, Remove every other vault strategy aside from XSGD-RWA from the firebase schema in terms of content
* Help and support page, Link the Troubleshooting common issues and How to use your dashboard and manage your portfolio

#### General

* Make display look better for mobile 
* See whether its possible to deploy to Electron and Mobile similar to Proquaere and Caselist
* Make small visual and aesthetic modifications to ./app/landing/page.tsx and add images accordingly
* Make Nidus landing page adhere to the black and blue colorscheme and add Nidus PNG logo that richard sent
* Add Nidus logo to the current landing page at ./app/landing AND the web app site at ./app/ and tweak the background UI colors to make everything adhere to the new colorscheme
* See if there's any way to refactor the codebase to make switching and testing out UI/UX color palettes a bit easier
* Sync up the withdrawal, deposit and receipt modals so that it can dynamically withdraw and deposit from any of the user's strategies, **currently** just hardcoded to XSGD since that's the MVP requirement
* Once the entire UI is approved, make new project and deploy on vercel under new name, purpose is for URL to be changed

## Contributors

<table>
	<tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/richardleii58">
                    <img src="https://avatars.githubusercontent.com/u/174111738?v=4" width="100;" alt="richardleii58"/>
                    <br/>
                    <sub><b>Richard Lei</b></sub>
                    <br/>
                </a>
                <sub><i>Business, Marketing</i><br><b>CEO</b></sub>
            </td>
            <td align="center">
                <a href="https://github.com/gongahkia">
                    <img src="https://avatars.githubusercontent.com/u/117062305?v=4" width="100;" alt="gongahkia"/>
                    <br/>
                    <sub><b>Gabriel Ong</b></sub>
                    <br/>
                </a>
                <sub><i>Frontend, Backend, DevOps</i><br><b>CTO</b></sub>
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

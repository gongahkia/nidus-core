# MVP for NIDUS Core

## Access

* [veritas-core.vercel.app](https://veritas-core.vercel.app/)
* [veritas-core.vercel.app/landing](https://veritas-core.vercel.app/landing) *(deprecated for now)*

### To do (deadline ...)

* For each Vault-specific plan page, modify the performance snapshot graph so that when hovered over with the mouse it should show APR or TVL instead of value
* For each Vault-specific plan page, modify the performance snapshot X-axis so that Day 1 2 3 becomes exact dates in 3-day intervals
* Modify performance snapshot to include 2 graphs per the below screenshot for APR and TVL, modify the firebase schema accordingly
* Each graph should have a dropdown list of variable timeframes (last week, last month, last 3 months, last 6 months, last year)
* For each Vault-specific plan page, comment out the "Trade History" table for now so its just showing a single table 

<img width="937" height="400" alt="image" src="https://github.com/user-attachments/assets/302b40ec-f60d-4ec6-bd93-6574b03553fa" />

#### General

* Make display look better for mobile 
* See whether its possible to deploy to Electron and Mobile similar to Proquaere and Caselist
* Account page settings, make the assets card properly stylised like the portfolio card currently instead of just raw text
* Make small visual and aesthetic modifications to ./app/landing/page.tsx and add images accordingly
* Make Nidus landing page adhere to the black and blue colorscheme and add Nidus PNG logo that richard sent
* Add Nidus logo to the current landing page at ./app/landing AND the web app site at ./app/ and tweak the background UI colors to make everything adhere to the new colorscheme
* See if there's any way to refactor the codebase to make switching and testing out UI/UX color palettes a bit easier
* Help and support page, Link the Troubleshooting common issues and How to use your dashboard and manage your portfolio to other pages
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

### Public Architecture Diagram

```mermaid
---
config:
  layout: fixed
---
flowchart LR
 subgraph subGraph0["<b><u>User Interfaces</u></b>"]
        WebApp@{ label: "Client Web App<br><i style=\"--tw-scale-x:\">(Next.js)</i>" }
        AdminDashboard["Admin Dashboard Web App<br><i>(Next.js)</i>"]
        MobileApp["Mobile App<br><i>(Electron.js)</i>"]
  end
 subgraph subGraph1["<u><b>API Gateway</b></u>"]
        Kong["API Gateway<br><i>(Kong Gateway)</i>"]
  end
 subgraph subGraph2["<b><u>Core Microservices</u></b>"]
        UserService["User Service<br><i>(Auth, Transcation)</i>"]
        YieldEngine["Yield Engine<br><i>(Manual Calculations)</i>"]
        PolicyTracker["Policy Ops<br><i>(Manual Entry)</i>"]
        AdminOps["Admin Service<br><i>(Administrative)</i>"]
        LiquidityMgr["Liquidity Manager<br><i>(Buffer Alerts)</i>"]
        MarketData["Market Data<br><i>(Collated from various sites)</i>"]
  end
 subgraph subGraph3["<b><u>Data Storage</u></b>"]
        PostgreSQL["PostgreSQL<br><i>(Primary DB)</i>"]
        Redis(["Redis<br><i>(Session cache)</i>"])
        S3["AWS S3<br><i>(Document storage)</i>"]
  end
 subgraph Infrastructure["Scheduler Middleware"]
        RabbitMQ["RabbitMQ<br><i>(Message Broker)</i>"]
  end
 subgraph subGraph4["<b><u>External Integrations</u></b>"]
        XRPL["XRPL Wallet Protocol <br><i>(XSGD Transactions)</i>"]
        PriceOracles["XRPL API<br><i>(Price Oracles API)</i>"]
        StraitsX["StraitsX API<br><i>(StraitsX API values)</i>"]
  end
    WebApp <-.-> Kong
    MobileApp <-.-> Kong
    AdminDashboard <-.-> Kong
    StraitsX --> MarketData
    PriceOracles --> MarketData
    Kong -.-> UserService & AdminOps & PolicyTracker
    AdminOps <--> LiquidityMgr
    UserService <-.-> RabbitMQ
    RabbitMQ <-.-> XRPL
    UserService --> YieldEngine & AdminOps
    MarketData --> YieldEngine & UserService
    PolicyTracker --> AdminOps
    UserService -.-> Redis
    PolicyTracker -.-> Redis
    AdminOps -.-> Redis
    PolicyTracker <-.-> PostgreSQL
    LiquidityMgr -.-> PostgreSQL
    PostgreSQL <--> S3
    WebApp@{ shape: rect}
    Kong@{ shape: rounded}
    UserService@{ shape: decision}
    PolicyTracker@{ shape: diam}
    AdminOps@{ shape: diam}
    PostgreSQL@{ shape: cyl}
    S3@{ shape: docs}
    style subGraph0 fill:#FFCDD2
    style subGraph1 fill:#FFF9C4
    style subGraph2 fill:#C8E6C9
    style subGraph4 fill:#BBDEFB
    style subGraph3 fill:#E1BEE7
```

### Internal Reference Architecture Diagram

```mermaid
---
config:
  layout: dagre
---
flowchart TD
 subgraph subGraph0["<b><u>User Interfaces</u></b>"]
        WebApp@{ label: "Client Web App<br><i style=\"--tw-scale-x:\">(Next.js)</i>" }
        AdminDashboard["Admin Dashboard Web App<br><i>(Next.js)</i>"]
        MobileApp["Mobile App<br><i>(Electron.js)</i>"]
  end
 subgraph subGraph1["<u><b>API Gateway</b></u>"]
        Kong["API Gateway<br><i>(Kong Gateway)</i>"]
  end
 subgraph subGraph2["<b><u>Core Microservices</u></b>"]
        UserService["User Service<br><i>(Auth, Transcation)</i>"]
        YieldEngine["Yield Engine<br><i>(Manual Calculations)</i>"]
        PolicyTracker["Policy Ops<br><i>(Manual Entry)</i>"]
        AdminOps["Admin Service<br><i>(Administrative)</i>"]
        LiquidityMgr["Liquidity Manager<br><i>(Buffer Alerts)</i>"]
        AnalyticsService["Analytics Service<br><i>(Reporting)</i>"]
        MarketData["Market Data<br><i>(Collated from various sites)</i>"]
  end
 subgraph subGraph3["<b><u>Data Storage</u></b>"]
        PostgreSQL["PostgreSQL<br><i>(Primary DB)</i>"]
        Redis(["Redis<br><i>(Session cache)</i>"])
        S3["AWS S3<br><i>(Document storage)</i>"]
  end
 subgraph subGraph4["<b><u>External Integrations</u></b>"]
        XRPL["XRPL Wallet Protocol <br><i>(XSGD Transactions)</i>"]
        PriceOracles["XRPL API<br><i>(Price Oracles API)</i>"]
        StraitsX["StraitsX API<br><i>(StraitsX API values)</i>"]
        Private["Insurance Providers API<br><i>(Policy API values)</i>"]
  end
 subgraph Infrastructure["Scheduler Middleware"]
        RabbitMQ["RabbitMQ<br><i>(Message Broker)</i>"]
  end
    WebApp <-.-> Kong
    MobileApp <-.-> Kong
    AdminDashboard <-.-> Kong
    Private --> MarketData
    StraitsX --> MarketData
    PriceOracles --> MarketData
    Kong -.-> UserService & AdminOps & PolicyTracker
    AdminOps <--> LiquidityMgr
    AnalyticsService --> AdminOps
    PolicyTracker --> AnalyticsService
    UserService <-.-> RabbitMQ <-.-> XRPL
    UserService --> YieldEngine
    MarketData --> YieldEngine & AnalyticsService
    UserService -.-> Redis
    PolicyTracker -.-> Redis
    AdminOps -.-> Redis
    PolicyTracker <-.-> PostgreSQL
    LiquidityMgr -.-> PostgreSQL
    AnalyticsService -.-> PostgreSQL
    PostgreSQL <--> S3
    WebApp@{ shape: rect}
    Kong@{ shape: rounded}
    UserService@{ shape: decision}
    PolicyTracker@{ shape: diam}
    AdminOps@{ shape: diam}
    AnalyticsService@{ shape: hex}
    PostgreSQL@{ shape: cyl}
    S3@{ shape: docs}
    style subGraph0 fill:#FFCDD2
    style subGraph1 fill:#FFF9C4
    style subGraph2 fill:#C8E6C9
    style subGraph4 fill:#BBDEFB
    style subGraph3 fill:#E1BEE7
```

### Links

* [Updated Canva Pitch Deck](https://www.canva.com/design/DAGsFpctDPc/3xg1_mWRvNI8-xKh4SyyeA/edit?utm_content=DAGsFpctDPc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

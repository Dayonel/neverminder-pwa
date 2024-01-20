# Neverminder

Find below the necessary configuration to run this project.

## Configure over https for local IP(s)

You will need `Chocolatey` in windows

```bash
# First, we need to run the Get-ExecutionPolicy. If it returns Restricted, then we need to run the command below.
Set-ExecutionPolicy AllSigned

# Now run the following command in the Windows shell.
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1')) 
```

## Find your local IPv4
```bash
ipconfig
```

> in my case
> Dirección IPv4. . . . . . . . . . . . . . : 192.168.178.129

## Install mkcert

Use brew to download mkcert package.

```bash
brew install mkcert

# install a local certificate authority
mkcert -install

# create your certificate with mkcert
cd your_project
mkdir cert
cd cert

# replace 192.168.178.129 for your local IP for the next command
mkcert -key-file key.pem -cert-file cert.pem 192.168.178.129
```

## Download the CA certificate

```bash
# navigate to
C:\Users\dayon\AppData\Local\mkcert
```

Copy the file `rootCA.pem`
Paste the file in project `static` folder.

## Run the project
```bash
npm run dev
```

Navigate to the url in your browser (replace for your local IP):
>  ➜  Local:   https://localhost:5173/
>  ➜  Network: https://192.168.178.129:5173/
>  ➜  press h + enter to show help

## Install trusted certificate in IOS
> In iOS open: Settings -> Profile Downloaded
> Tap Install (use your iPhone password)
> Now open: Settings -> General -> About -> Certificate Trust Settings -> Enable radio button for your downloaded certificate.

## Navigate to the https URL
> Use your local IP for both developing in desktop & testing in mobile:
> Network: https://192.168.178.129:5173
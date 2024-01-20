# Neverminder

Find below the necessary configuration to run this project.

## Run the project
```bash
npm run dev
```

>  ➜  Local:   https://localhost:5173/
➜  Network: https://192.168.178.129:5173/
➜  press h + enter to show help

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
Dirección IPv4. . . . . . . . . . . . . . : 192.168.178.129

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

## Restart the project
```bash
Ctrl + C
npm run dev
```

## Download certificate (iOS):
> Navigate to: https://192.168.178.129:5173/rootCA.pem

## Install trusted certificate (iOS)
> In iOS open: Settings -> Profile Downloaded
Tap Install (use your iPhone password)
Now open: Settings -> General -> About -> Certificate Trust Settings -> Enable radio button for your downloaded certificate.

## or
---

## Download certificate (Android):
> Navigate to: https://192.168.178.129:5173/rootCA.pem
Click 3 dots and save the certificate (see image below)
[![Save Android Certificate](https://i.imgur.com/6CIXeY4.png)](https://i.imgur.com/6CIXeY4.png)
(option 2) download it from here: https://github.com/Dayonel/neverminder-pwa/blob/25dc74d8a4e2cdc79b98089c71bbcaca9e67a4e8/rootCA.pem

## Install trusted certificate (Android)
> Open settings.
Go to 'Privacy'
Go to 'Install from SD card'
Select 'rootCA.pem'
Add any name to the certificate

## Done! Navigate to the https URL
> Use your local IP for both developing in desktop & testing in mobile:
> Network: https://192.168.178.129:5173
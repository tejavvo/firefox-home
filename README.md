# Firefox Hompage
A simple and lightweight script to set a custom homepage, both local and webpages for firefox

The Hompage given is a webpage, meaning any amount of customisation is allowed. The default provided homepage is a striped down version of [BeyondMagic's Homepage](https://github.com/BeyondMagic/homepage), with an addition of slightly over a 100 quotes.

`init.sh` takes a HTML file as input. The file path given is absolute (example: ~/.config/homepage), ie. if the file is replaced the `mozilla.cfg` file will have to be regenerated by the script, or alternatively you can change `newTabURL` variable to the desired url in the `/usr/lib/firefox/mozilla.cfg`.

Todo:
 - snap compatability
 - Windows & Mac

**Note: Requires Sudo Permissions**
## Installation
- Clone the Repository and cd into it
```
git clone https://github.com/tejavvo/fire-home.git
cd fire-home
```
- For convinence move your homepage into the `/usr/lib/firefox` folder, although it can be any **global folder (requires sudo)** otherwise it wont work in any other account. If your using the provided homepage the command would be.
```
sudo mv ./firefox-homepage/ /usr/lib/firefox/
```
- Run the `init.sh` file, (note: you *may* have to make it executable)
```
sh init.sh /usr/lib/firefox/firefox-homepage/index.html // or whatever filepath.
```
- And your all set! Firefox should be running your homepage.

## Other
- Focus search bar on homepage
Even though most of the internets answers didn't work (atleast for me), this script provides a autofocus on the firefox new tab. You can enable this by adding a `--autofocus` option while running `init.sh`.

**Note:** This part is **automatically** done internally, The code below is the implementation.

`--autofocus` is internally implemented by adding the following code to `mozilla.cfg`
```
// Auto focus new tab content
try {
    Cu.import('resource://gre/modules/Services.jsm');
    Cu.import('resource:///modules/BrowserWindowTracker.jsm');
   
    Services.obs.addObserver((event) => {
        window = BrowserWindowTracker.getTopWindow();
        window.gBrowser.selectedBrowser.focus();
    }, 'browser-open-newtab-start');
} catch(e) { Cu.reportError(e); }
```
![BeyondMagic's Homepage](/main.png?raw=trueg)  
<br></br>
![BeyondMagic's Homepage Search](/search_preview.gif?raw=trueg)  
source: BeyondMagic's Homepage  

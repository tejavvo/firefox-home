echo "Checking File"
if [ $# -eq 0 ]; then
  echo "No File Path Given"
  exit 1
fi

if [ ! -f $1 ] ; then
  echo "File does not exist"
  exit 1
fi

if [ "${1%.html}" == "$1" ] ; then
  echo "Non HTML File Given"
  exit 1
fi
echo "File Valid"
echo ' '

echo "Creating 'mozilla.cfg'"
echo "//
var {classes:Cc,interfaces:Ci,utils:Cu} = Components;

/* set new tab page */
try {
  Cu.import('resource:///modules/AboutNewTab.jsm');
  var newTabURL = 'file://${1}';
  AboutNewTab.newTabURL = newTabURL;
} catch(e){Cu.reportError(e);} // report errors in the Browser Console" >> mozilla.cfg
echo "Done"
#echo "File Contents: 'mozilla.cfg'"
#cat mozilla.cfg | sed 's/^/  /'
echo ' '

echo "Creating 'autoconfig.js'"
echo "//
pref('general.config.filename', 'mozilla.cfg');
pref('general.config.obscure_value', 0);
pref('general.config.sandbox_enabled', false);" >> autoconfig.js
echo "Done"
#echo "File Contents: 'autoconfig.js'"
#cat autoconfig.js | sed 's/^/  /'

autofocus() {
echo ' '
echo "AutoFocus Enabling"
echo " " >> mozilla.cfg
echo "// Auto focus new tab content
try {
    Cu.import('resource://gre/modules/Services.jsm');
    Cu.import('resource:///modules/BrowserWindowTracker.jsm');
   
    Services.obs.addObserver((event) => {
        window = BrowserWindowTracker.getTopWindow();
        window.gBrowser.selectedBrowser.focus();
    }, 'browser-open-newtab-start');
} catch(e) { Cu.reportError(e); }" >> mozilla.cfg
echo "Done"
}

for var in "$@"
do
    if [ "$var" == "--autofocus" ]; then
        autofocus
    fi
done

if [ -f /usr/lib/firefox/mozilla.cfg ]; then
    sudo rm /usr/lib/firefox/mozilla.cfg
fi
if [ -f /usr/lib/firefox/defaults/pref/autoconfig.js ]; then
    sudo rm /usr/lib/firefox/defaults/pref/autoconfig.js
fi

echo ' '
echo "Moving 'mozilla.cfg' to '/usr/lib/firefox'"
sudo mv mozilla.cfg /usr/lib/firefox/
echo "Moving 'autoconfig.js' to '/usr/lib/firefox/defaults/pref'"
sudo mv autoconfig.js /usr/lib/firefox/defaults/pref/

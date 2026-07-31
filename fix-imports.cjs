const fs = require('fs');
const path = require('path');

const mappings = {
  'BottomNav': 'layout/BottomNav',
  'Footer': 'layout/Footer',
  'TabSwitch': 'layout/TabSwitch',
  'WltHeaderPrice': 'layout/WltHeaderPrice',
  'WltLogo': 'layout/WltLogo',
  
  'AccountInfoModal': 'modals/AccountInfoModal',
  'ProfileSettingModal': 'modals/ProfileSettingModal',
  'UserInfoEdit': 'modals/UserInfoEdit',
  'WalletConnectModal': 'modals/WalletConnectModal',
  
  'BannerSection': 'play/BannerSection',
  'BannerSkeleton': 'play/BannerSkeleton',
  'GameHoverOverlay': 'play/GameHoverOverlay',
  'GameSection': 'play/GameSection',
  'GamesSkeleton': 'play/GamesSkeleton',
  'MobileGameSection': 'play/MobileGameSection',
  
  'animations': 'shared/animations',
  'country-region': 'shared/country-region',
  'ProductLogo': 'shared/ProductLogo',
  'Skeletons': 'shared/Skeletons',
  'WinnerPopoverContent': 'shared/WinnerPopoverContent',
  'WinnerPopover.css': 'shared/WinnerPopover.css',
};

function walkSync(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walkSync(p, callback);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.scss') || p.endsWith('.css')) {
      callback(p);
    }
  }
}

walkSync('src', (file) => {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;
  
  for (const [key, value] of Object.entries(mappings)) {
    // Regex for:
    // import ... from "./components/WltLogo" 
    // or import ... from "../components/WltLogo"
    // or import ... from "../../components/WltLogo"
    
    // We want to match: (["'])((\.\.\/)+|\.\/)(components)\/([^"']*)
    // But it's easier to just match the specific files
    
    const regex1 = new RegExp(`(["'])([\\.\\/]+)components\\/${key}(["'])`, 'g');
    content = content.replace(regex1, `$1$2components/${value}$3`);

    const regex2 = new RegExp(`(["'])([\\.\\/]+)components\\/${key}\\/([^"']+)`, 'g');
    content = content.replace(regex2, `$1$2components/${value}/$3`);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
});

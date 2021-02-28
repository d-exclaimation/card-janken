osascript -e 'tell app "Terminal"
  do script "cd ~/<path-to-this>/server && go install && ~/go/bin/battle-cards-multi"
end tell'
osascript -e 'tell app "Terminal"
   do script "cd ~/<path-to-this>/app && npm run start"
end tell'
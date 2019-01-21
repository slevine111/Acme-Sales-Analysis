./node_modules/mocha/bin/mocha SalesAnalysis.spec.js --reporter mochawesome

osascript -e '

set u to "file:///Users/stevenlevine/FullStack%20Academy/WeekendProjects.MyCode/Weekend-02/Acme-Sales-Analysis/mochawesome-report/mochawesome.html"
tell application "Google Chrome"
    repeat with w in windows
        set i to 0
        repeat with t in tabs of w
            set i to i + 1
            if URL of t is u then
                set active tab index of w to i
                set index of w to 1
                tell t to reload
                activate
                return
            end if
        end repeat
    end repeat
        open location "file:///Users/stevenlevine/FullStack Academy/WeekendProjects.MyCode/Weekend-02/Acme-Sales-Analysis/mochawesome-report/mochawesome.html"
    activate
end tell'

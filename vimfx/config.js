let map = (shortcuts, command, custom=false) => {
    vimfx.set(`${custom ? 'custom.' : ''}mode.normal.${command}`, shortcuts)
}

map('Q', 'paste_and_go')
map('q', 'paste_and_go_in_tab')
map('w', 'copy_current_url')
map('z', 'history_back')
map('c', 'history_forward')
map('t', 'reload_all')
map('T', 'reload_all_force')
map('!', 'stop')
map('@', 'stop_all')
map('<space>', 'scroll_page_down')
map('<s-space>', 'scroll_page_up')
map('s', 'scroll_half_page_up')
map('a', 'tab_new')
map('', 'tab_new_after_current')
map('ya', 'tab_duplicate')
map('A', 'tab_select_previous')
map('D', 'tab_select_next')
map('S', 'tab_move_forward')
map('', 'follow_in_focused_tab')
map('<c-Q>', 'follow_in_window')
map('<c-q>', 'follow_multiple')
map('1', 'follow_previous')
map('2', 'follow_next')

// Zoom actions
vimfx.addCommand({
      name: 'zoom_in',
      description: 'Zoom in',
}, ({vim}) => {
      vim.window.FullZoom.enlarge()
})
vimfx.set('custom.mode.normal.zoom_in', '!')

vimfx.addCommand({
      name: 'zoom_out',
      description: 'Zoom out',
}, ({vim}) => {
      vim.window.FullZoom.reduce()
})
vimfx.set('custom.mode.normal.zoom_out', '@')
//

// Close tabs to the left

let {commands} = vimfx.modes.normal
vimfx.addCommand({
  name: 'tab_close_to_start',
  description: 'Close tabs to the left',
  category: 'tabs',
  order: commands.tab_close_to_end.order + 1,
}, ({vim}) => {
  let {gBrowser} = vim.window
  Array.slice(gBrowser.tabs, gBrowser._numPinnedTabs, gBrowser.selectedTab._tPos)
    .forEach(tab => gBrowser.removeTab(tab))
})
vimfx.set('custom.mode.normal.tab_close_to_start', 'gx0')
//

// Close window

vimfx.addCommand({
  name: 'window_close',
  description: 'Close window',
  order: commands.follow_in_private_window.order + 1,
}, ({vim}) => {
  let {window} = vim
  if (window.gBrowser.tabs.length > 1) {
    window.close()
  }
})
vimfx.set('custom.mode.normal.window_close', 'ZZ')
//

// Restart Firefox
const {classes: Cc, interfaces: Ci} = Components;
vimfx.addCommand({
    name: 'restart',
    description: 'Restart Firefox'
}, (args) => {
    let canceled = Cc["@mozilla.org/supports-PRBool;1"]
        .createInstance(Ci.nsISupportsPRBool);

    Services.obs.notifyObservers(canceled, "quit-application-requested", "restart");

    if (canceled.data) return false; // somebody canceled our quit request

    // restart
    Cc['@mozilla.org/toolkit/app-startup;1'].getService(Ci.nsIAppStartup)
        .quit(Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart);

    return true;
});
vimfx.set('custom.mode.normal.restart', 'ZR')
//


//Search for the selected text
vimfx.addCommand({
  name: 'search_selected_text',
  description: 'Search for the selected text',
}, ({vim}) => {
  let {messageManager} = vim.window.gBrowser.selectedBrowser
  vimfx.send(vim, 'getSelection', null, selection => {
    let inTab = true // Change to `false` if you’d like to search in current tab.
    vim.window.BrowserSearch.loadSearch(selection, inTab)
  })
})
vimfx.set('custom.mode.normal.search_selected_text', '<c-d>')
//

// Search bookmarks / Search open tabs
vimfx.addCommand({
  name: 'search_tabs',
  description: 'Search tabs',
  category: 'tabs',
  order: commands.focus_location_bar.order + 1,
}, (args) => {
  let {vim} = args
  let {gURLBar} = vim.window
  gURLBar.value = ''
  commands.focus_location_bar.run(args)
  // Change the `*` on the text line to a `%` to search tabs instead of bookmarks.
  gURLBar.value = '% '
  gURLBar.onInput(new vim.window.KeyboardEvent('input'))
})
vimfx.set('custom.mode.normal.search_tabs', '<c-/>')

vimfx.addCommand({
  name: 'search_bookmarks',
  description: 'Search bookmarks',
  category: 'tabs',
  order: commands.focus_location_bar.order + 1,
}, (args) => {
  let {vim} = args
  let {gURLBar} = vim.window
  gURLBar.value = ''
  commands.focus_location_bar.run(args)
  // Change the `*` on the text line to a `%` to search tabs instead of bookmarks.
  gURLBar.value = '* '
  gURLBar.onInput(new vim.window.KeyboardEvent('input'))
})
vimfx.set('custom.mode.normal.search_bookmarks', '<c-?>')
//

// Open addons
vimfx.addCommand({
  name: 'addons',
  description: 'Addons',
}, ({vim}) => {
  vim.window.gBrowser.loadOneTab('about:addons')
})
vimfx.set('custom.mode.normal.addons', '<c-e>')
//

// Play a link with an external media player
const mpv_path = '/usr/bin/mpv'
const mpv_options = '--video-unscaled=yes'

vimfx.addCommand({
  name: 'play_with_mpv',
  description: 'Play the focused link with MPV'
}, ({vim}) => {
  vimfx.send(vim, 'getCurrentHref', null, url => {
    let file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsIFile)
    file.initWithPath(mpv_path)

    let process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess)
    process.init(file)

    let args = mpv_options.split(' ')

    if (url.includes('youtube.com')) {
      // Parse url params to an object like:
      // {"v":"g04s2u30NfQ","index":"3","list":"PL58H4uS5fMRzmMC_SfMelnCoHgB8COa5r"}
      let qs = (function(a) {
        if (a == '') return {}
        let b = {}
        for (let i = 0; i < a.length; ++i) {
          let p = a[i].split('=', 2)
          if (p.length == 1) {
            b[p[0]] = ''
          } else {
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '))
          }
        }
        return b
      })(url.substr(1).split('&'))

      if (qs['list'] && qs['index']) {
        // Example args: ['--video-unscaled=yes', '--ytdl-raw-options=format=best']
        // So check for ytdl-raw-options.
        let ytdlRawOptionsIndex = -1
        for (let i = 0; i < args.length; i++) {
          if (args[i].includes('ytdl-raw-options')) {
            ytdlRawOptionsIndex = i
            break
          }
        }

        if (ytdlRawOptionsIndex > -1) {
            args[ytdlRawOptionsIndex] += `,yes-playlist=,playlist-start=${qs['index']}`
        } else {
            args.push(`--ytdl-raw-options=yes-playlist=,playlist-start=${qs['index']}`)
        }
      }
    }

    args.push(url)

    // process.run(false, args, args.length)
    process.runAsync(args, args.length)
  })
})
vimfx.set('custom.mode.normal.play_with_mpv', 'gm')
//

vimfx.addCommand({
  name: 'downthemall_click_toolbar_button',
  description: 'DownThemAll',
}, ({vim}) => {
  vim.window.document.getElementById('dta-button').click()
})
vimfx.set('custom.mode.normal.downthemall_click_toolbar_button', '#')

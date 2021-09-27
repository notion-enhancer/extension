/*
 * notion-enhancer core: menu
 * (c) 2021 dragonwocky <thedragonring.bod@gmail.com> (https://dragonwocky.me/)
 * (https://notion-enhancer.github.io/) under the MIT license
 */

'use strict';

export default async function (api, db) {
  const { env, fs, registry, web } = api,
    sidebarSelector = '.notion-sidebar-container .notion-sidebar > div:nth-child(4)';
  await web.whenReady([sidebarSelector]);

  const $sidebarLink = web.html`<div class="enhancer--sidebarMenuLink" role="button" tabindex="0">
      <div>
        <div>${await fs.getText('icon/colour.svg')}</div>
        <div><div>notion-enhancer</div></div>
      </div>
    </div>`;
  web.addHotkeyListener(await db.get(['hotkey']), env.openEnhancerMenu);

  const setTheme = () =>
    db.set(['theme'], document.querySelector('.notion-dark-theme') ? 'dark' : 'light');
  $sidebarLink.addEventListener('click', () => {
    setTheme().then(env.openEnhancerMenu);
  });
  window.addEventListener('focus', setTheme);
  window.addEventListener('blur', setTheme);
  setTheme();

  const errors = await registry.errors(),
    notifications = {
      cache: await db.get(['notifications'], []),
      provider: await fs.getJSON('https://notion-enhancer.github.io/notifications.json'),
      count: errors.length,
    };
  for (const notification of notifications.provider) {
    if (!notifications.cache.includes(notification.id)) notifications.count++;
  }
  if (notifications.count) {
    $sidebarLink.dataset.hasNotifications = true;
    web.render(
      $sidebarLink.children[0],
      web.html`<div class="enhancer--notificationBubble"><div><span>${notifications.count}</span></div></div>`
    );
  }

  web.render(document.querySelector(sidebarSelector), $sidebarLink);
}

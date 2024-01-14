// Go to www.youtube.com/feed/channels and run script below in console
// If it doesnt work, please increase timeoutBetweenSteps

(async function () {
    const timeoutBetweenSteps = 100;
    const createAwaitPromise = function (timeout = 100) {
        return new Promise((res) => {
            setTimeout(() => res(), timeout);
        });
    }

    let unsubscribed = [];

    // Default 100 first channels on list (row)
    const pageChannelsList = document.querySelectorAll('ytd-channel-renderer');
    for (let channel of pageChannelsList) {
        const channelName = channel.querySelector('ytd-channel-name yt-formatted-string').innerHTML;
        console.log(`Unsubscribing: ${channelName} ...`);

        // Open menu list
        const openMenuButton = channel.querySelector('ytd-subscription-notification-toggle-button-renderer-next button');
        openMenuButton.click();

        // Wait for list opening
        await createAwaitPromise(timeoutBetweenSteps);

        // Click unsubscribe on list
        const menuList = document.querySelectorAll('ytd-menu-popup-renderer tp-yt-paper-listbox ytd-menu-service-item-renderer');
        menuList[3].click();

        // Wait for dialog opening
        await createAwaitPromise(timeoutBetweenSteps);

        // Confirm dialog 
        const confirmButton = document.querySelector('yt-confirm-dialog-renderer #confirm-button button');
        confirmButton.click();

        const link = channel.querySelector('.channel-link').href;
        unsubscribed.push({ channelName, link });
        // Wait 1 sec
        await createAwaitPromise(timeoutBetweenSteps);
    }

    console.log('Unsubscribed:');
    console.table(unsubscribed);
})();

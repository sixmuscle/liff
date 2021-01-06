
// Body element
const body = $('#body');

// Button elements
const btnSend = $("#btnSend");
const btnClose = $("#btnClose");
const btnShare = $("#btnShare");
const btnLogIn = $("#btnLogIn");
const btnLogOut = $("#btnLogOut");
const btnScanCode = $("#btnScanCode");
const btnOpenWindow = $("#btnOpenWindow");

// Profile elements
const isLoggin = $('#isLoggin');
const email = $("#email");
const userId = $("#userId");
const pictureUrl = $("#pictureUrl");
const displayName = $("#displayName");
const statusMessage = $("#statusMessage");

// QR element
const code = $("#code");
const friendShip = $("#friendShip");

async function main() {
    await liff.init({ liffId: "1655297051-AMPkaJbm" });

    $("#isLoggedIn").html("<b>isLoggin : </b>" + liff.isLoggedIn());

    if (!liff.isInClient()) {
        if (liff.isLoggedIn()) {
            btnLogIn.css("display", "none");
            btnLogOut.css("display", "block");
            btnSend.css("display", "block");
            btnShare.css('display', 'block');
            getUserProfile();
        } else {
            liff.login();
            btnLogIn.css("display", "block");
            btnLogOut.css("display", "none");
            btnSend.css("display", "none");
            btnShare.css('display', 'none');
        }

    } else {
        // btnSend.css('display', 'block');
        getUserProfile();
    }


}

async function sendMsg() {
    if (liff.getContext().type !== "none" && liff.getContext().type !== "external") {
        await liff.sendMessages([
            {
                'type': 'text',
                'text': 'This message was sent by sendMessages()'
            }
        ])
        alert("Message send")
    } else {
        alert("liff.getContext().type : " + liff.getContext().type);
    }
}

async function shareMsg() {
    await liff.shareTargetPicker([
        {
            type: "image",
            originalContentUrl: "https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg",
            previewImageUrl: "https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg"
        }
    ])
}

async function getUserProfile() {
    const profile = await liff.getProfile()
    userId.html("<b>usesrId : </b>" + profile.userId);
    statusMessage.html("<b>statusMessage : </b>" + profile.statusMessage);
    pictureUrl.attr('src', profile.pictureUrl);
    displayName.html("<b>displayName : </b>" + profile.displayName);
    email.html("<b>email : </b>" + liff.getDecodedIDToken().email);
}

btnLogIn.on('click', function () {
    liff.login();
});

btnLogOut.on('click', function () {
    liff.logout();
    window.location.reload();
});

btnSend.on('click', function () {
    sendMsg();
});


btnShare.on('click', function () {
    shareMsg();
});

main()
export const getLink = (variant: string, eventId?: number, userId?: string) => {
	let linkUrl = "";

	if (variant === "participant") {
		linkUrl = `/events/${eventId}/participants/invite`;
	} else if (variant === "gift-event") {
		linkUrl = `/events/new`;
	} else {
		linkUrl = `/events/${eventId}/participants/${userId}/gifts/new`;
	}
	return linkUrl;
};

export const getButtonTitle = (variant: string) => {
	let buttonTitle = "";

	if (variant === "participant") {
		buttonTitle = "Add Person";
	} else if (variant === "gift-event") {
		buttonTitle = "Add Event";
	} else {
		buttonTitle = "Add Gift";
	}
	return buttonTitle;
};

export const getInviteHTML = (
	inviteLink: string,
	eventName: string,
	currUserName: string
) => {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  lang="en"
  dir="ltr"
  style="
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  "
>
  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <style data-emotion="css-global o6gwfi">
      @media print {
        body {
          background-color: #fff;
        }
      }
    </style>
    <style>
      @media screen and (max-width: 599.95px) {
        .block-mobile {
          display: block !important;
        }

        .block-desktop {
          display: none !important;
        }
      }
    </style>
  </head>

  <body
    style="
      box-sizing: inherit;
      margin: 0;
      color: rgba(0, 0, 0, 0.87);
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5;
      letter-spacing: 0.00938em;
      background-color: #ffffff;
    "
  >
    <div
      class="css-15v2ows"
      style="
        box-sizing: inherit;
        font-weight: 400;
        font-size: 16px;
        padding: 32px 0;
        margin: 0;
        letter-spacing: 0.15008px;
        line-height: 1.5;
        background-color: #ffffff;
        font-family: 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial,
          sans-serif;
        color: #242424;
      "
    >
      <div
        style="
          box-sizing: inherit;
          display: none;
          overflow: hidden;
          line-height: 1px;
          opacity: 0;
          max-height: 0;
          max-width: 0;
        "
      >
        
        <div style="box-sizing: inherit">
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
        </div>
      </div>
      <table
        align="center"
        width="100%"
        style="
          box-sizing: inherit;
          background-color: #ffffff;
          max-width: 600px;
          min-height: 48px;
        "
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        bgcolor="#ffffff"
      >
        <tbody style="box-sizing: inherit">
          <tr style="box-sizing: inherit; width: 100%">
            <td style="box-sizing: inherit">
              <div
                style="
                  padding: 24px 24px 8px 24px;
                  text-align: left;
                  max-width: 100%;
                  box-sizing: border-box;
                "
              >
                <h1 style="color: #0068ff">GiftListPal</h1>
              </div>
              <div
                style="
                  font-family: inherit;
                  font-size: 16px;
                  font-weight: normal;
                  padding: 16px 24px 0px 24px;
                  text-align: left;
                  max-width: 100%;
                  box-sizing: border-box;
                "
              >
                <div
                  style="
                    border: 1px solid #eeeeee;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 16px;
                    font-weight: normal;
                    padding: 16px 24px 16px 24px;
                    text-align: left;
                    max-width: 100%;
                    box-sizing: border-box;
                  "
                >
                  <div
                    style="
                      font-family: inherit;
                      font-size: 16px;
                      font-weight: normal;
                      padding: 16px 0px 16px 0px;
                      text-align: left;
                      max-width: 100%;
                      box-sizing: border-box;
                    "
                  >
                    <div class="css-vii0ua" style="box-sizing: inherit">
                      <div style="box-sizing: inherit">
                        <p
                          style="
                            box-sizing: inherit;
                            margin-top: 0px;
                            margin-bottom: 0px;
                          "
                        >
                          ${currUserName} has invited you to 
                          <strong style="box-sizing: inherit; font-weight: 700"
                            >${eventName}</strong
                          >
                          on GiftListPal.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style="
                      color: #474849;
                      font-family: inherit;
                      font-size: 16px;
                      font-weight: normal;
                      padding: 16px 0px 16px 0px;
                      text-align: left;
                      max-width: 100%;
                      box-sizing: border-box;
                    "
                  >
                    <div class="css-vii0ua" style="box-sizing: inherit">
                      <div style="box-sizing: inherit">
                        <p
                          style="
                            box-sizing: inherit;
                            margin-top: 0px;
                            margin-bottom: 0px;
                          "
                        >Use this e-mail address when signing in to accept the invite and join the event.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style="
                      font-family: inherit;
                      font-size: 16px;
                      font-weight: bold;
                      padding: 32px 0px 16px 0px;
                      text-align: center;
                      max-width: 100%;
                      box-sizing: border-box;
                    "
                  >
                    <a
                      href=${inviteLink}
                      target="_blank"
                      style="
                        box-sizing: inherit;
                        background-color: #0068ff;
                        color: #ffffff;
                        padding: 0px 0px;
                        border-radius: 4px;
                        width: 100%;
                        display: inline-block;
                        line-height: 100%;
                        text-decoration: none;
                        max-width: 100%;
                      "
                      ><span style="box-sizing: inherit"
                        ><!--[if mso
                          ]><i
                            style="
                              letter-spacing: undefinedpx;
                              mso-font-width: -100%;
                              mso-text-raise: 0;
                            "
                            hidden
                            >&nbsp;</i
                          ><!
                        [endif]--></span
                      ><span
                        style="
                          box-sizing: inherit;
                          background-color: #0068ff;
                          color: #ffffff;
                          padding: 12px 20px;
                          border-radius: 4px;
                          width: 100%;
                          display: inline-block;
                          max-width: 100%;
                          line-height: 120%;
                          text-decoration: none;
                          text-transform: none;
                          mso-padding-alt: 0px;
                          mso-text-raise: 0;
                        "
                        >Accept invite</span
                      ><span style="box-sizing: inherit"
                        ><!--[if mso
                          ]><i
                            style="
                              letter-spacing: undefinedpx;
                              mso-font-width: -100%;
                            "
                            hidden
                            >&nbsp;</i
                          ><!
                        [endif]--></span
                      ></a
                    >
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;
};

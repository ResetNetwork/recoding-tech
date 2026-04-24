import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

// Material UI imports
import { Grid, Link, Typography } from "@mui/material";

const ShareButtons = (props) => {
  const [isShare, setShare] = useState(false);
  const { url } = props;

  return (
    <Grid container spacing={2} sx={{ marginTop: "16px" }}>
      <Grid item sx={{ paddingTop: "0px!important" }}>
        <Link
          href="/republish"
          sx={{
            textDecoration: "none",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          <Typography
            component="div"
            variant="h5"
            sx={{
              backgroundColor: "#FFF",
              borderRadius: "12px",
              border: "1px solid #000",
              color: "#000",
              fontSize: "16px",
              fontWeight: "400!important",
              lineHeight: "1.5!important",
              paddingX: "16px",
              paddingY: "8px",
              boxShadow: "0px 2px 2px 0px #0000001F",
              textTransform: "none",
              m: 0,
              "&:hover": {
                backgroundColor: "#EEE",
              },
            }}
          >
            Republish
          </Typography>
        </Link>
      </Grid>
      <Grid item sx={{ paddingTop: "0px!important" }}>
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => setShare((prev) => !prev)}
        >
          <Typography
            component="div"
            variant="h5"
            sx={{
              backgroundColor: isShare ? "#000" : "#FFF",
              borderRadius: "12px",
              border: "1px solid #000",
              color: isShare ? "#FFF" : "#000",
              fontSize: "16px",
              fontWeight: "400!important",
              lineHeight: "1.5!important",
              paddingX: "16px",
              paddingY: "8px",
              boxShadow: "0px 2px 2px 0px #0000001F",
              textTransform: "none",
              m: 0,
              "&:hover": {
                backgroundColor: isShare ? "#222" : "#EEE",
              },
            }}
          >
            <svg
              width="13.333"
              xmlns="http://www.w3.org/2000/svg"
              height="13.333"
              id="screenshot-520e8d55-89d5-802c-8007-d521227915ab"
              viewBox="11050.333 1204.343 13.333 13.333"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="none"
              version="1.1"
              style={{ fill: isShare ? "#FFF" : "#000", marginRight: "4px" }}
            >
              <g id="shape-520e8d55-89d5-802c-8007-d521227915ab">
                <defs></defs>
                <g
                  className="fills"
                  id="fills-520e8d55-89d5-802c-8007-d521227915ab"
                >
                  <path d="M11056.1669921875,1214.343505859375L11056.1669921875,1207.551513671875L11054,1209.718505859375L11052.833984375,1208.510009765625L11057,1204.343505859375L11061.1669921875,1208.510009765625L11060,1209.718505859375L11057.833984375,1207.551513671875L11057.833984375,1214.343505859375L11056.1669921875,1214.343505859375ZM11052,1217.676513671875C11051.5419921875,1217.676513671875,11051.1494140625,1217.513427734375,11050.8232421875,1217.187255859375C11050.4970703125,1216.860595703125,11050.333984375,1216.468505859375,11050.333984375,1216.010009765625L11050.333984375,1213.510009765625L11052,1213.510009765625L11052,1216.010009765625L11062,1216.010009765625L11062,1213.510009765625L11063.6669921875,1213.510009765625L11063.6669921875,1216.010009765625C11063.6669921875,1216.468505859375,11063.50390625,1216.860595703125,11063.177734375,1217.187255859375C11062.8505859375,1217.513427734375,11062.458984375,1217.676513671875,11062,1217.676513671875L11052,1217.676513671875Z"></path>
                </g>
              </g>
            </svg>
            Share
          </Typography>
        </button>
      </Grid>
      {isShare && (
        <Grid
          item
          sx={{
            paddingTop: "5px!important",
            display: "flex",
            alignItems: "center",
            maxHeight: "44px",
          }}
        >
          <Link
            href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
              url
            )}`}
            target="_blank"
          >
            <Image
              src="/images/share_linkedin.png"
              alt="Share"
              width={45}
              height={44}
            />
          </Link>

          <Link
            href={`https://toot.cat/share?url=${encodeURIComponent(url)}`}
            target="_blank"
          >
            <Image
              src="/images/share_mastodon.png"
              alt="Share"
              width={44}
              height={44}
            />
          </Link>

          <Link
            href={`https://bsky.app/intent/compose?text=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            style={{ marginLeft: "6px" }}
          >
            <Image
              src="/images/share_bluesky.png"
              alt="Share"
              width={37}
              height={37}
            />
          </Link>

          <Link
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            style={{ marginLeft: "6px" }}
          >
            <Image
              src="/images/share_reddit.png"
              alt="Share"
              width={43}
              height={43}
            />
          </Link>

          <Link
            href={`https://wa.me/send?text=${encodeURIComponent(url)}`}
            target="_blank"
            style={{ marginLeft: "3px" }}
          >
            <Image
              src="/images/share_whats.png"
              alt="Share"
              width={44}
              height={44}
            />
          </Link>

          <Link
            href={`mailto:?subject=${encodeURIComponent(url)}`}
            target="_blank"
            style={{ marginLeft: "6px" }}
          >
            <Image
              src="/images/share_email.png"
              alt="Share"
              width={40}
              height={40}
            />
          </Link>

          <Link
            href={"#"}
            style={{ marginLeft: "10px" }}
            onClick={() => {
              try {
                navigator.share({ text: url });
              } catch (error) {
                // ignore
              }
              return false;
            }}
          >
            <Image
              src="/images/share_link.png"
              alt="Share"
              width={40}
              height={40}
            />
          </Link>
        </Grid>
      )}
    </Grid>
  );
};

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ShareButtons;

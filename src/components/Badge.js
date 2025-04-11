import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const badges = [
  { key: "perspective", label: "Perspective", color: "#1d5d9e" },
  { key: "analysis", label: "Analysis", color: "#376055" },
  { key: "news", label: "News", color: "#da1619" },
  { key: "podcast", label: "Podcast", color: "#6c5c29" },
  { key: "announcement", label: "Announcement", color: "#000000" },
  { key: "transcript", label: "Transcript", color: "#a00086" },
];

function Badge({ badge, variant = "default" }) {
  const currentBadge = badges.find((b) => b.key === badge);
  if (!currentBadge) return <></>;

  return (
    <Box
      sx={{
        marginBottom: variant == "link" ? "6px" : "16px",
        color: variant == "link" ? currentBadge.color : "#fff",
        backgroundColor: variant == "link" ? undefined : currentBadge.color,
        padding: variant == "link" ? undefined : "7px 16px",
        borderRadius: "4px",
        display: "inline-block",
        textTransform: "uppercase",
        fontFamily: "Lexend",
        fontSize: "12px",
        fontWeight: "500",
      }}
    >
      {currentBadge.label}
    </Box>
  );
}

Badge.propTypes = {
  badge: PropTypes.string,
  variant: PropTypes.string,
};

export default Badge;

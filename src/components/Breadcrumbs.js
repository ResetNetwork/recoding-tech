import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import { Link } from "../utils";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// function format(crumb) {
//     return titleCase(crumb.split("-").join(" "));
// }

const CustomBreadcrumbs = (page) => {
  const router = useRouter();
  const { layout, title } = page.page;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    console.log("router!", router);
    console.log("page in breadcrumbs, page +>", page);
    const crumbs = [];

    if (layout === "policy_action") {
      crumbs.push("Policy Tracker");
      crumbs.push(title);
    }

    setBreadcrumbs(crumbs);
  }, []);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ color: "#000" }}
    >
      <Link href="/">
        <Typography variant="body2" color="#000">
          Home
        </Typography>
      </Link>
      {breadcrumbs.length
        ? breadcrumbs.map((crumb) => (
          <Typography key={crumb} variant="body2" color="#000">
            {crumb}
          </Typography>
        ))
        : null}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
// base imports
import React from "react";

import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  subscribe: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      flexDirection: "column",
    },
  },
}));

function NewsletterSubscribe() {
  const classes = useStyles();

  return (
    <div
      id="mlb2-5983225"
      className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-5983225"
    >
      <div style={{ padding: "40px", backgroundColor: "#37675c" }}>
        <div className="ml-form-align-center">
          <div
            className="ml-form-embedWrapper embedForm"
            style={{
              maxWidth: "100%",
              backgroundColor: "transparent",
              border: "1px solid #fff",
              borderRadius: "0px",
            }}
          >
            <div
              className="ml-form-embedBody ml-form-embedBodyDefault row-form"
              style={{ padding: "20px" }}
            >
              <div
                className="ml-form-embedContent"
                style={{ marginBottom: "20px" }}
              >
                <h4
                  style={{
                    fontSize: "27px",
                    fontWeight: 700,
                    color: "#fff",
                    textAlign: "left",
                    fontFamily: "Libre Baskerville",
                    textTransform: "none",
                    marginBottom: "4px",
                  }}
                >
                  Our Content delivered to your inbox.
                </h4>
                <div
                  style={{
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "300",
                    lineHeight: 1.5,
                    color: "#fff",
                  }}
                >
                  Join our newsletter on issues and ideas at the intersection of
                  tech & democracy
                </div>
              </div>
              <form
                className="ml-block-form"
                action="https://static.mailerlite.com/webforms/submit/s8h5n5"
                data-code="s8h5n5"
                method="post"
                target="_blank"
              >
                <div style={{ display: "flex" }}>
                  <Box
                    className={classes.subscribe}
                    sx={{
                      width: "100%",
                      minWidth: 0,
                      "& .ml-form-formContent": {
                        flex: "1 1 0%",
                        minWidth: 0,
                        width: "auto !important",
                        float: "none !important",
                        marginBottom: "0 !important",
                      },
                      "& .ml-form-embedSubmit": {
                        flex: "0 0 auto",
                        width: "auto !important",
                        float: "none !important",
                        marginBottom: "0 !important",
                      },
                      "& .ml-form-embedSubmit button.primary": {
                        width: "auto !important",
                        whiteSpace: "nowrap",
                      },
                    }}
                  >
                    <div
                      className="ml-form-formContent"
                      style={{
                        flex: "1 1 0%",
                        minWidth: 0,
                        marginBottom: "0px",
                      }}
                    >
                      <div className="ml-form-fieldRow ml-last-item">
                        <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                          <input
                            aria-label="email"
                            aria-required="true"
                            type="email"
                            data-inputmask=""
                            name="fields[email]"
                            placeholder="Enter email address"
                            autoComplete="email"
                            style={{
                              padding: "9px !important",
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <input type="hidden" name="ml-submit" value="1" />
                    <div
                      className="ml-form-embedSubmit"
                      style={{ marginBottom: "0px", flex: "0 0 auto" }}
                    >
                      <button
                        type="submit"
                        className="primary"
                        style={{
                          backgroundColor: "#589383!important",
                          fontFamily: "Lexend, sans-serif!important",
                          display: "flex",
                          fontSize: "16px !important",
                          lineHeight: 1.5,
                          fontWeight: "400 !important",
                          alignItems: "center",
                          padding: "10px 16px !important",
                          textTransform: "uppercase",
                          borderRadius: "12px!important",
                        }}
                      >
                        Subscribe
                      </button>
                      <button
                        disabled="disabled"
                        style={{ display: "none" }}
                        type="button"
                        className="loading"
                      >
                        {" "}
                        <div className="ml-form-embedSubmitLoad"></div>{" "}
                        <span className="sr-only">Loading...</span>{" "}
                      </button>
                    </div>
                  </Box>
                </div>
                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>
            <div
              className="ml-form-successBody row-success"
              style={{ display: "none" }}
            >
              <div className="ml-form-successContent">
                <h4>Thank you!</h4>
                <p style={{ textAlign: "center" }}>
                  You have successfully joined our subscriber list.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsletterSubscribe;

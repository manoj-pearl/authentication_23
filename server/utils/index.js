const httpOnlyCookieValidity = () => {
  const currentDate = new Date();
  return new Date(
    currentDate.getTime() + 14 * 24 * 60 * 60 * 1000 // 14 days validity
  );
};

export const saveAccessTokenInCookies = (res, accessToken) => {
  return res.cookie("accessToken", accessToken, {
    httpOnly: true,
    expires: httpOnlyCookieValidity(),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  });
};

const ipLocation = () => {
  const request = fetch("https://ipinfo.io/json?token=e000eea0006ac7")
    .then((ip) => ip.json())
    .then((cityIp) => cityIp.city);
  return request;
};
export default ipLocation;

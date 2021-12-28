export default class ipLocation {
  log = console.log;

  ipLocation = async () => {
    const request = await fetch("https://ipinfo.io/json?token=e000eea0006ac7")
      .then((ip) => ip.json())
      .then((cityIp) => cityIp.city);
    console.log(request);
    return request;
  };

  // test = this.log(this.ip());
}

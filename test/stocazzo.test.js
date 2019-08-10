const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const { requestFormatter } = require("../lib/utils");
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require("../lib/server");

describe("Testing stocazzo's", () => {
  let server;

  beforeEach(async () => {
      server = await init();
  });

  afterEach(async () => {
      await server.stop();
  });

  it("GET /", async () => {
    var options = {
      method: "GET",
      url: "/"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.response).to.equal("stocazzo");
  });

  it("GET / with request body", async () => {
    var options = {
      method: "GET",
      url: "/?q=chi%20e"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.query).to.equal("chi e?");
    expect(response.result.response).to.equal("stocazzo");
  });

  it("GET /caps", async () => {
    var options = {
      method: "GET",
      url: "/caps"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.response).to.equal("STOCAZZO");
  });

  it("GET /caps with request body", async () => {
    var options = {
      method: "GET",
      url: "/caps?q=chi%20e"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.query).to.equal("chi e?");
    expect(response.result.response).to.equal("STOCAZZO");
  });

  it("GET /camel", async () => {
    var options = {
      method: "GET",
      url: "/camel"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.response).to.equal("StoCazzo");
  });

  it("GET /ascii", async () => {
    var options = {
      method: "GET",
      url: "/ascii"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.response).to.equal("8====D");
  });

  it("GET /underscore", async () => {
    var options = {
      method: "GET",
      url: "/underscore"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.response).to.equal("sto_cazzo");
  });

  it("GET /underscore", async () => {
    var options = {
      method: "GET",
      url: "/underscore?big=1"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.response).to.equal(
      "sto_gran_cazzo"
    );
  });

  it("GET /sto-conte", async () => {
    var options = {
      method: "GET",
      url: "/sto-conte"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.response).to.equal("Sto cazzo!");
  });

  it("GET /sto-conte", async () => {
    var options = {
      method: "GET",
      url: "/sto-conte?big=1"
    };

    const response = await server.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result.response).to.equal(
      "Sto gran cazzo!"
    );
  });

  it("Utils requestFormatter() adding question mark", async () => {
    var testReq = { query: { q: "chi è" } },
      testRes = { response: "stocazzo" };

    requestFormatter(testReq, testRes);
    expect(testRes.query).to.equal("chi è?");
  });

  it("Utils requestFormatter(), no question mark added", async () => {
    var testReq = { query: { q: "chi è?" } },
      testRes = { response: "stocazzo" };

    requestFormatter(testReq, testRes);
    expect(testRes.query).to.equal("chi è?");
  });
});
const expect = require("chai").expect;
const book = require("../book.js");

describe("Book module", () => {
 it("returns requested book", () => {
   const result = book.get("dune");
   expect(result).to.deep.equal({ title:"Dune", author:"Frank Herbert", pubdate:1965 });
 });
 
 it("fails w/ invalid book", () => {
   const result = book.get("fake");
   expect(result).to.be.undefined;
 });
 
 it("adds a new book", () => {
   const result = book.add({ title:"Test", author:"Tester", pubdate:3019 });
   expect(result).to.deep.equal("success");
 });
 
 it("adds an old book", () => {
   const result = book.add({ title:"Dune", author:"Frank Herbert", pubdate:1965 });
   expect(result).to.deep.equal("fail");
 });
 
 it("deletes book", () => {
   const result = book.delete("dune");
//   console.log(typeof result);
//   console.log(result);
//   console.log(typeof { title:"Dune", author:"Frank Herbert", pubdate:1965 });
//   console.log({ title:"Dune", author:"Frank Herbert", pubdate:1965 });
   expect(result).to.deep.equal({ title:"Dune", author:"Frank Herbert", pubdate:1965 });
 });
 
 it("deletes invalid book", () => {
   const result = book.delete("fake");
   expect(result).to.be.undefined;
 });
});
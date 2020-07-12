const { assert } = require("console");

let Auction = artifacts.require("./Auction.sol");

let auctionInstance;

contract('AuctionContract', function (accounts) {
  //accounts[0] is the default account
  //Test case 1
  it("Contract deployment", function() {
    //Fetching the contract instance of our smart contract
    return Auction.deployed().then(function (instance) {
      //We save the instance in a gDlobal variable and all smart contract functions are called using this
      auctionInstance = instance;
      assert(auctionInstance !== undefined, 'Auction contract should be defined');
    });
  });

  //Sample Test Case
  it("Should set bidders", function() {
    return auctionInstance.register({from:accounts[1]}).then(function(result) {
        return auctionInstance.getPersonDetails(0);
    }).then(function(result) {
      assert(result[2], accounts[1], 'bidder address set');
    })
  });

  //Test Case for checking if the bid is more than the token amount
  it("Should NOT allow to bid more than remaining tokens", function() {
    /**********
    TASK 1:   Call bid method from accounts[1] of Auction.sol using auctionInstance and
    pass itemId=0, count=6 as arguments
    HINT:     To make a function call from account 1 use {from: accounts[1]} as an extra argument
    ***********/
    return auctionInstance.bid(0, 6, {from: accounts[1]})
    .then(function (result) {
      /*
      We are testing for a negative condition and hence this particular block will not have executed if our test case was correct. If this part is executed then we throw an error and catch the error to assert false
      */
      throw("Failed to check remaining tokens less than count");
    }).catch(function (e) {
      var a = e.toString();
      if(e === "Failed to check remaining tokens less than count") {
        /**********
        TASK 2: This is the error which we had thrown. Should you assert true or false?
        HINT:   Use assert(false) to assert false
                Use assert(true) to assert true
        ***********/
        assert(false);
      } else {
        /**********
        TASK 3: assert the opposite here
        ***********/
        assert(true);
      }
    })
  });

  //Modifier Checking
  it("Should NOT allow non owner to reveal winners", function() {
    /**********
    TASK 4: Call revealWinners from account 1
    ***********/
     return auctionInstance.revealWinners({from: accounts[1]})
     .then(function (instance) {
       /*
       We are testing for a negative condition and hence this particular block will not have executed if our test case was correct. If this part is executed then we throw an error and catch the error to assert false
       */
       throw("Failed to check owner in reveal winners");
     }).catch(function (e) {
       if(e === "Failed to check owner in reveal winners") {
         /**********
         TASK 5: This is the error which we had thrown. Should you assert true or false?
         HINT:   Use assert(false) to assert false
                 Use assert(true) to assert true
         ***********/
         assert(false);
       } else {
         /**********
         TASK 6: assert the opposite here
         ***********/
         assert(true);
       }
     })
   });

});
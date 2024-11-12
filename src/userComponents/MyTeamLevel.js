import React, { useEffect, useState } from "react";
import { url } from "../apiHelper/apiHelper";

const MyTeamLevel = () => {
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const [MyDirect, setMyDirect] = useState([]);
  const [secondLevel, setSecondLevel] = useState([]);
  const [thirdLevel, setThirdLevel] = useState([]);
  const [fourthLevel, setFourthLevel] = useState([]);
  const [fifthLevel, setFifthLevel] = useState([]);

  const getAllUsers = async () => {
    const response = await fetch(`${url}/api/users/all-refer-users`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 200) {
      setUsers(result.result);

      let MyDirects = [];
      let secondLevels = [];
      let thirdLevels = [];
      let fourthLevels = [];
      let fifthLevels = [];
      result.result.map((item) => {
        if (item.level1 === userId) {
          MyDirects.push(item);
        } else if (item.level2 === userId) {
          secondLevels.push(item);
        } else if (item.level3 === userId) {
          thirdLevels.push(item);
        } else if (item.level4 === userId) {
          fourthLevels.push(item);
        } else if (item.level5 === userId) {
          fifthLevels.push(item);
        }
      });
      console.log(result.result);
      setMyDirect(MyDirects);
      setSecondLevel(secondLevels);
      setThirdLevel(thirdLevels);
      setFourthLevel(fourthLevels);
      setFifthLevel(fifthLevels);
    } else {
      setUsers(result.result);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="mainDashboard">
      <div className="row mt-1">
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-4">
          <div className="card my-3 bg-primary">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-white">My Directs Team</h5>
              </div>
              <h4 className="mb-0 text-white text-end">
                <i className="fa fa-rupee"></i> {MyDirect.length}
              </h4>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-4">
          <div className="card my-3 bg-success">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h5 className="mb-2 text-capitalize text-white">
                  My Second Level Team
                </h5>
              </div>
              <h4 className="mb-0 text-white fw-bold text-end">
                {secondLevel.length}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-4">
          <div className="card my-3 bg-info">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-danger shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-white">My Third Level Team</h5>
              </div>
              <h4 className="mb-0 text-white text-end">{thirdLevel.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-4">
          <div className="card my-3 bg-warning">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-info shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-white">My Fourth Level Team</h5>
              </div>
              <h4 className="mb-0 text-white text-end">{fourthLevel.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-4">
          <div className="card my-3 bg-danger">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-white">My Fifth Level Team</h5>
              </div>
              <h4 className="mb-0 text-white text-end">{fifthLevel.length}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeamLevel;

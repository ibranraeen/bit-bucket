import '../css/data.css';
import React, { useState, useEffect } from "react";

const Data = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getBucketObjectList();
  }, []);

  const saveFile = (event) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("s3-file", file);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        getBucketObjectList();
      }
    };

    xhr.timeout = 5000;
    xhr.open("POST", "/upload-to-s3");
    xhr.send(formData);
  };

  const getBucketObjectList = () => {
    getData("/all-files", (data = []) => {
      data = JSON.parse(data);
      setList(data);
    });
  };

  const downloadFile = (index) => {
    const fileName = (list[index] || {}).key;
    getData(`/get-object-url/${fileName}`, (url) => {
      window.open(url, "_blank");
    });
  };

  const getData = (url, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        cb(xhr.responseText);
      }
    };
    xhr.timeout = 10000;
    xhr.open("GET", url);
    xhr.send();
  };

  return (
    <div className='background'>
      <h4>Choose File</h4>
      <input type="file" id="s3-file" onChange={saveFile} />
      <h4>Bucket Data</h4>
      <div id="bucket-data-list">
        {list.map((item, index) => (
          <div
            className="card"
            key={item.key}
            onClick={() => downloadFile(index)}
          >
            File Name: {item.key}
            <br />
            File Size: {item.size}
            <br />
            File Modified: {item.lastModified}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
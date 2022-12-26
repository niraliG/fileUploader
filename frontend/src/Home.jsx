import React, { useEffect, useState } from "react";
import { Space, Table, Button, message, Upload } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
const Home = () => {
  const [tblData, setTblData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 5,
    total: 0,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    getFiles();
  }, [page]);

  const columns = [
    {
      title: "File",
      dataIndex: "fileName",
      key: "name",
      render: (text) => {
        let result = text.substring(text.indexOf("_") + 1);
        return <a>{result}</a>;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record)}
          />
        </Space>
      ),
    },
  ];

  const handleDownload = async (record) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/media/uploads/${record.fileName}`
    );
    const file = await response.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = record.fileName;
    a.click();
  };
  const handleFileUpload = async (info) => {
    setFileLoading(true);
    const formData = new FormData();
    formData.append("file", info.file.originFileObj);

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND}/api/files/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          google_id: localStorage.getItem("googleId"),
        },
      }
    );
    if (res.status === 200) {
      setFileLoading(false);
      message.success("File Uploaded Successfully!");
      getFiles();
    } else {
      setFileLoading(false);
      message.error("Error in File Uploading!");
    }
  };
  const dummyRequest = (info) => {
  };
  const pagination = {
    ...paginationMeta,
    onChange: (page) => {
      setPage(page);
    },
  };
  const getFiles = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND}/api/files?currentPage=${page}&pageSize=${paginationMeta.pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          google_id: localStorage.getItem("googleId"),
        },
      }
    );
    if (res.status === 200) {
      const { data } = await res.json();
      setTblData(data?.rows);
      setPaginationMeta({ ...paginationMeta, total: data.count });
      setLoading(false);
    } else {
      const { message : responseMessage } = await res.json();
      message.error(responseMessage)
      setLoading(false)
      if(res.status === 401) {
        localStorage.clear()
        window.location.reload()
      }
    }
  };
  return (
    <>
      <div style={{ display: "block", float: "right", margin: "10px" }}>
        <Space size={"middle"}>
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            LOGOUT
          </Button>

          <Upload
            name="file"
            multiple={false}
            accept="*"
            customRequest={dummyRequest}
            onChange={handleFileUpload}
            showUploadList={false}
          >
            <Button type="primary" shape="round" loading={fileLoading}>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
        </Space>
      </div>
      <Table
        style={{ marginTop: "20px" }}
        rowKey="id"
        columns={columns}
        dataSource={tblData}
        loading={loading}
        pagination={pagination}
      />
      ;
    </>
  );
};

export default Home;

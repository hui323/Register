package com.alex.server.sign;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

public class SaveDataServlet extends HttpServlet {

	public static void main(String[] args) {
		DataEntity dataEntity = new DataEntity();
		dataEntity.setOpenId("openId");
		dataEntity.setNickName("nickName");
		dataEntity.setChildName("childName");
		dataEntity.setParentName("parentName");
		dataEntity.setMobilePhone("mobilePhone");
		dataEntity.setClassName("className");
		new SaveDataServlet().saveDataInDB(dataEntity);
	}

	private static final long serialVersionUID = 1L;
	private static final File file = new File("D:/signData.txt");

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		String openId = req.getParameter("openId");
		String nickName = req.getParameter("nickName");
		String childName = req.getParameter("childName");
		String parentName = req.getParameter("parentName");
		String mobilePhone = req.getParameter("mobilePhone");
		String className = req.getParameter("className");
		if (openId == null) {
			ResponseUtil.setResponseSuccess(resp, getData());
			return;
		}
		DataEntity dataEntity = new DataEntity();
		dataEntity.setOpenId(openId);
		dataEntity.setNickName(nickName);
		dataEntity.setChildName(childName);
		dataEntity.setParentName(parentName);
		dataEntity.setMobilePhone(mobilePhone);
		dataEntity.setClassName(className);
		ResponseUtil.setResponseSuccess(resp, dataEntity);
		saveDataInFile(dataEntity);
		saveDataInDB(dataEntity);
	}

	private void saveDataInFile(DataEntity dataEntity) {
		String line = JSON.toJSONString(dataEntity).toString();
		try {
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(file, true), "UTF-8"));
			bw.write(line + "\n");
			bw.close();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(line);
	}

	private void saveDataInDB(DataEntity dataEntity) {
		Connection conn;
		PreparedStatement preparedStatement;
		Statement statement;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306",
					"root", "root");
			statement = conn.createStatement();
			statement.execute("CREATE DATABASE IF NOT EXISTS sign");
			statement.execute("USE sign");
			String createTableString = "CREATE TABLE IF NOT EXISTS join_list(id integer PRIMARY KEY AUTO_INCREMENT,openId text,nickName text,childName text,parentName text,mobilePhone text,className text)";
			statement.execute(createTableString);

			String insertDataString = "INSERT INTO join_list(openId,nickName,childName,parentName,mobilePhone,className)VALUES(?,?,?,?,?,?)";
			preparedStatement = conn.prepareStatement(insertDataString);
			preparedStatement.setString(1, dataEntity.getOpenId());
			preparedStatement.setString(2, dataEntity.getNickName());
			preparedStatement.setString(3, dataEntity.getChildName());
			preparedStatement.setString(4, dataEntity.getParentName());
			preparedStatement.setString(5, dataEntity.getMobilePhone());
			preparedStatement.setString(6, dataEntity.getClassName());
			preparedStatement.addBatch();
			preparedStatement.executeBatch();

			preparedStatement.close();
			statement.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private List<DataEntity> getData() {
		List<DataEntity> dataList = new ArrayList<DataEntity>();
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(
					new FileInputStream(file), "UTF-8"));
			while (true) {
				String line = br.readLine();
				if (line == null) {
					break;
				} else {
					DataEntity dataEntity = JSON.parseObject(line,
							DataEntity.class);
					dataList.add(dataEntity);
				}
			}
			br.close();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return dataList;
	}

}

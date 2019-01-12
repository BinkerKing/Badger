package net.riking.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 * 执行Bat文件工具
 * */
public class InvokeBatUtil {
	Logger logger = LogManager.getLogger("InvokeBat");

	/**
	 * @param 带路径bat文件名
	 * @return 执行成功 true 执行失败 false
	 */
	public boolean runbat(String batName) {
		// 检查文件是否存在
		File file = new File(batName);
		if (!file.exists()) {
			logger.info("InvokeBatUtil.runbat失败[" + batName + "文件不存在！]");
			return false;
		}
		// 生成执行bat文件命令
		String cmd = "" + batName;// pass
		try {
			// 执行命令
			Process ps = Runtime.getRuntime().exec(cmd);
			// 获得日志信息
			InputStream in = ps.getInputStream();
			// 用一个读输出流类去读
			InputStreamReader isr = new InputStreamReader(in);
			BufferedReader br = new BufferedReader(isr);
			String line = null;
			// 一行行读取返回值，当读取到end时，证明bat文件执行结束
			logger.info("启动[" + batName + "]文件日志:\n");
			while ((line = br.readLine()) != null) {
				logger.info(line);
				if (line.equals("end")) {
					logger.info("结束");
				}
			}
			in.close();
			ps.waitFor();
		} catch (IOException ioe) {
			ioe.printStackTrace();
			return false;
		} catch (InterruptedException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static void main(String[] args) {
		InvokeBatUtil invokeBatUtil = new InvokeBatUtil();
		invokeBatUtil.runbat("D://test.bat");
	}
}

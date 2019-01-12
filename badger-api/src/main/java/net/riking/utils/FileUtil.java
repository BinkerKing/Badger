package net.riking.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

/**
 * 文件处理工具类
 */
public class FileUtil {
	public static String ZipDir = "E:\\ods\\zipback";
	public static String fileDir = "E:\\ods\\zipback";
	
	//压缩并下载到浏览器
	public static void toZip(List<File> fileList,OutputStream output) throws IOException{
		if(null != fileList && !fileList.isEmpty()){
			byte[] buf = new byte[1024];
			ZipOutputStream zipOut = new ZipOutputStream(output);
			for(File file : fileList){
				FileInputStream in = new FileInputStream(file);
				zipOut.putNextEntry(new ZipEntry(file.getName()));
				int len;
				while((len = in.read(buf)) > 0){
					zipOut.write(buf, 0, len);
				}
				zipOut.closeEntry();
				in.close();
				file.delete();//清除临时文档
			}
			zipOut.close();
		}
	}
	//压缩并下载到指定目录
	public static void toZip(List<File> fileList,String zipName) throws IOException{
		if(null != fileList && !fileList.isEmpty()){
			byte[] buf = new byte[1024];
			FileOutputStream os = new FileOutputStream(zipName);
			ZipOutputStream zipOut = new ZipOutputStream(os);
			for(File file : fileList){
				FileInputStream in = new FileInputStream(file);
				zipOut.putNextEntry(new ZipEntry(file.getName()));
				int len;
				while((len = in.read(buf)) > 0){
					zipOut.write(buf, 0, len);
				}
				zipOut.closeEntry();
				in.close();
				file.delete();//清除临时文档
			}
			zipOut.close();
		}
	}
	
	public static List<File> unZip(File srcFile, String destDirPath) throws RuntimeException {
		List<File> fileList = new ArrayList<>();
		long start = System.currentTimeMillis();
	    // 判断源文件是否存在
	    if (!srcFile.exists()) {
	        throw new RuntimeException(srcFile.getPath() + "所指文件不存在");
	    }
	    // 开始解压
	    ZipFile zipFile = null;
	    try {
	        zipFile = new ZipFile(srcFile);
	        Enumeration<?> entries = zipFile.entries();
	        while (entries.hasMoreElements()) {
	            ZipEntry entry = (ZipEntry) entries.nextElement();
	            System.out.println("解压" + entry.getName());
	            // 如果是文件夹，就创建个文件夹
	            if (entry.isDirectory()) {
	                String dirPath = destDirPath + "/" + entry.getName();
	                File dir = new File(dirPath);
	                dir.mkdirs();
	            } else {
	                // 如果是文件，就先创建一个文件，然后用io流把内容copy过去
	                File targetFile = new File(destDirPath + "/" + entry.getName());
	                // 保证这个文件的父文件夹必须要存在
	                if(!targetFile.getParentFile().exists()){
	                    targetFile.getParentFile().mkdirs();
	                }
	                targetFile.createNewFile();
	                // 将压缩文件内容写入到这个文件中
	                InputStream is = zipFile.getInputStream(entry);
	                FileOutputStream fos = new FileOutputStream(targetFile);
	                int len;
	                byte[] buf = new byte[4096];
	                while ((len = is.read(buf)) != -1) {
	                    fos.write(buf, 0, len);
	                }
	                fileList.add(targetFile);
	                // 关流顺序，先打开的后关闭
	                fos.close();
	                is.close();
	            }
	        }
	        long end = System.currentTimeMillis();
	        System.out.println("解压完成，耗时：" + (end - start) +" ms");
	        return fileList;
	    } catch (Exception e) {
	        throw new RuntimeException("unzip error from ZipUtils", e);
	    } finally {
	        if(zipFile != null){
	            try {
	                zipFile.close();
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	}
}

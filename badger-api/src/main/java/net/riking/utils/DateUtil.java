package net.riking.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Objects;

import javax.xml.datatype.DatatypeConstants;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

/**
 * 
 * 工具类
 *
 * <p>
 * 〈功能详细描述〉
 * @author Polly.li
 * @date 2017年3月14日 下午8:12:31
 * @see
 * @since 1.0
 */
public class DateUtil {
	public static final String DATE_PATTERN = "yyyy-MM-dd";

	public static final String TIME_PATTERN = "yyyy-MM-dd HH:mm";

	public static final String TIMESS_PATTERN = "yyyy-MM-dd HH:mm:ss";

	private DateUtil() {
	}

	public static String convertDateToString(Date date, String dataType) {
		SimpleDateFormat sDateFormat = new SimpleDateFormat(dataType);
		return sDateFormat.format(date);
	}

	/**
	 * 获得星期一
	 * @return
	 */
	public static Date getMonday() {
		return DateUtils.iterator(new Date(), DateUtils.RANGE_WEEK_MONDAY).next().getTime();
	}

	/**
	 * 获得星期日
	 * @return
	 */
	public static Date getSunday() {
		return DateUtils.iterator(new Date(), DateUtils.RANGE_WEEK_SUNDAY).next().getTime();
	}

	public static Date convertStringToDate(String strDate) throws ParseException {
		Date aDate = null;

		try {
			if (strDate.length() > 10) {
				aDate = convertStringToDate(TIME_PATTERN, strDate);
				return aDate;
			}
			if (strDate.length() == 10) {
				aDate = convertStringToDate(DATE_PATTERN, strDate);
				return aDate;
			}
		} catch (ParseException pe) {
			pe.printStackTrace();
			throw new ParseException(pe.getMessage(), pe.getErrorOffset());
		}

		return aDate;
	}

	public static Date convertStringToDate(String aMask, String strDate) throws ParseException {
		SimpleDateFormat df;
		Date date;
		df = new SimpleDateFormat(aMask);
		try {
			date = df.parse(strDate);
		} catch (ParseException pe) {
			// log.error("ParseException: " + pe);
			throw new ParseException(pe.getMessage(), pe.getErrorOffset());
		}

		return (date);
	}

	public static int dayBetween(Date date1, Date date2) {
		Date d1 = DateUtils.truncate(date1, Calendar.DATE);
		Date d2 = DateUtils.truncate(date2, Calendar.DATE);

		long time1 = d1.getTime();
		long time2 = d2.getTime();

		long between_days = (time1 - time2) / (1000 * 3600 * 24);

		return new Long(between_days).intValue();
	}

	public static Date getFirstDay(int year, int month) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));

		return calendar.getTime();
	}

	public static Date getLastDay(int year, int month) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));

		return calendar.getTime();
	}

	public static XMLGregorianCalendar convertToXMLGregorianCalendar(Date date) {

		GregorianCalendar cal = new GregorianCalendar();
		cal.setTime(date);
		XMLGregorianCalendar gc = null;
		try {
			gc = DatatypeFactory.newInstance().newXMLGregorianCalendar(cal);
			gc.setMillisecond(DatatypeConstants.FIELD_UNDEFINED);
			gc.setTimezone(DatatypeConstants.FIELD_UNDEFINED);
		} catch (Exception e) {

			e.printStackTrace();
		}
		return gc;
	}

	public static Date convertToDate(XMLGregorianCalendar c) throws ParseException {
		if (Objects.nonNull(c)) {
			GregorianCalendar ca = c.toGregorianCalendar();
			return (Date) ca.getTime();
		}
		return null;

	}

	/**
	 * 将字符串按指定的格式转换为日期类型
	 * 
	 * @param str 日期字符串
	 * @param format 指定格式
	 * @return 格式化后的日期对象
	 */
	public static Date strToDate(String str, String format) {

		SimpleDateFormat dtFormat = null;
		try {
			dtFormat = new SimpleDateFormat(format);

			return dtFormat.parse(str);

		} catch (Exception e) {

			e.printStackTrace();

		}
		return null;
	}

	public static void main(String args[]) {
		System.out.println(DateFormatUtils.format(getFirstDay(2016, 12), "yyyy-MM-dd"));
	}

	/**
	 * 日期格式转化 String 转化为Date
	 * @param input
	 * @return
	 * @throws ParseException
	 */
	public static java.util.Date parseStrToDate(String input) throws ParseException {
		return parseStrToDate(input, DATE_PATTERN);
	}

	/**
	 * 日期格式转化为指定格式的Spring
	 * @param input
	 * @param format
	 * @return
	 * @throws ParseException
	 */
	public static java.util.Date parseStrToDate(String input, String format) throws ParseException {
		if (StringUtils.isEmpty(input)) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.parse(input);
	}

	/**
	 * 将日期转化成特定类型的字符串
	 * @param date
	 * @param format
	 * @return
	 */
	public static String parseDateToInput(Date date, String format) {
		if (date == null) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}

	/**
	 * @throws ParseException
	 */
	public static Date getLastDate() throws ParseException {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_PATTERN);
		return simpleDateFormat.parse("9999-12-31");
	}
}

package net.riking.utils;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class MarkFieldUtil {
	// private String type;

	private static final String DELETE_MARK = "DELETE__";
	private static final String ADD_MARK = "ADD__";
	private static final String EDIT_MARK = "EDIT__";
	private static final String HISTORY_MARK = "HISTORY__";

	private static final String DADT_NAME = "DADT";
	private static final String BRCD_NAME = "BRCD";

	public MarkFieldUtil(String type) {
		super();
		// this.type = type;
	}

	public List<String> getMarkFields() {
		String[] fields = { getDeleteMark(), getAddMark(), getEditMark(), getHistoryMark() };
		return Arrays.asList(fields);
	}

	public boolean isMarkedDelete(Map<String, Object> data) {
		return notNull(data, DELETE_MARK);
	}

	public boolean isMarkedAdd(Map<String, Object> data) {
		return notNull(data, ADD_MARK);
	}

	public boolean isMarkedEdit(Map<String, Object> data) {
		return notNull(data, EDIT_MARK);
	}

	private boolean notNull(Map<String, Object> data, String fieldName) {
		Object object = data.get(fieldName);
		if (object == null) {
			return false;
		}
		return object.toString().equals("1");
	}

	public String getDeleteMark() {
		return DELETE_MARK;
	}

	public String getAddMark() {
		return ADD_MARK;
	}

	public String getEditMark() {
		return EDIT_MARK;
	}

	public String getHistoryMark() {
		return HISTORY_MARK;
	}

	public String getDadtName() {
		return DADT_NAME;
	}

	public String getBrcdName() {
		return BRCD_NAME;
	}

}

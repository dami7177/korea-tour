package com.bitcamp.korea_tour.model.service.homestay;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bitcamp.korea_tour.model.homestay.JoinHomeStayMarkDto;

public interface HomeStayMarkService {
	int getTotalCountOfMarkByUser(@Param("userNum")int loginNum);
	List<JoinHomeStayMarkDto> getMarkListByUser(int loginNum);
	void insertMark(@Param("homeStayNum") int homeStayNum, @Param("userNum")int loginNum);
	void deleteMark(@Param("homeStayNum") int homeStayNum, @Param("userNum")int loginNum);
	int countOfMyMark(int homeStayNum, @Param("userNum")int loginNum);
}

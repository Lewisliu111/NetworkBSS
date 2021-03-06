package com.liu.service;

import java.util.Map;

import com.liu.web.dto.PostDto;

public interface DashboardService {

	Map<String, Object> getDashboard(String tab, String start, String end);

	Map<String, Object> getPostEditJson(Long postId);

	Map<String, Object> editPost(PostDto newPostForm);

	Map<String, Object> getNumOfPostsByCategoriesForPieChart();

	Map<String, Object> getNumOfPostsByMonthForBarChart();

}

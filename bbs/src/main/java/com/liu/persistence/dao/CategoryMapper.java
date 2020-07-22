package com.liu.persistence.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.liu.persistence.model.Category;

@Mapper
public interface CategoryMapper {

	Category findByName(String categoryName);

	int save(Category category);

	List<Category> findAll();

}

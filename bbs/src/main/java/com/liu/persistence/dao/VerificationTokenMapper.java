package com.liu.persistence.dao;

import org.apache.ibatis.annotations.Mapper;

import com.liu.persistence.model.VerificationToken;

@Mapper
public interface VerificationTokenMapper {

	int save(VerificationToken token);

	VerificationToken findByToken(String token);

	VerificationToken findByUserId(Long userId);

}
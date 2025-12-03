package com.example.backend_gradle.iec_server.services;

import com.example.backend_gradle.iec_server.entities.Flyer;
import com.example.backend_gradle.iec_server.entities.Record;
import com.example.backend_gradle.iec_server.utils.ApiAssert;
import com.example.backend_gradle.iec_server.repositories.RecordJpaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RecordService {

    private final RecordJpaRepository recordRepo;

    public Record getRecordByFlyerId(long id) {
        var record = this.recordRepo.findByFlyerId(id).orElse(null);
        ApiAssert.notFoundIf(record == null, "Record not found with id:" + id);
        return record;
    }

    @Transactional
    public Record postRecord(long id, String email) {
        Record record = new Record();
        record.setFlyer_id(id);
        record.setEmail(email);
        return this.recordRepo.save(record);
    }

    @Transactional
    public void updateRecordByFlyerId(long id, Flyer flyer, String status) {
        var record = this.getRecordByFlyerId(id);
        record.setFlyer(flyer);
        record.setStatus(status);
        this.recordRepo.save(record);
    }

}
